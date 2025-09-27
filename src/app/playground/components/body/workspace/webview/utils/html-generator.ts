import { FileProcessor } from "./file-processor";
import { DependencyAnalyzer } from "../../../../../../../utils/dependency-analyzer";

export class HTMLGenerator {
  static generateHTML(files: Record<string, string>): string {
    const htmlContent = files["index.html"] || "";
    const cssContent = files["src/style.css"] || "";
    const allProcessedComponents = FileProcessor.processFiles(files);

    // Analyze dependencies to determine which CDN packages to include
    const dependencies = DependencyAnalyzer.analyzeDependencies(files);
    const cdnScripts = this.generateCDNScripts(dependencies);

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Playground</title>
        <style>
          ${cssContent}
          
          /* Additional styles for the playground */
          body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: #1a1a1a;
            color: #ffffff;
          }
          
          .App {
            text-align: center;
          }
          
          h1 {
            color: #4ade80;
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
          
          h2 {
            color: #4ade80;
            font-size: 1.5rem;
            margin-top: 0;
          }

          button {
            background-color: #4ade80;
            color: #1a1a1a;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
          }

          button:hover {
            background-color: #22c55e;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        
        ${cdnScripts}
        
        <script type="text/babel">
          ${this.generateScriptContent(allProcessedComponents)}
        </script>
      </body>
    </html>
  `;
  }

  private static generateCDNScripts(dependencies: any[]): string {
    const scripts: string[] = [];

    // Always include core React and Babel
    scripts.push(
      '<script crossorigin src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>'
    );
    scripts.push(
      '<script crossorigin src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>'
    );
    scripts.push(
      '<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>'
    );

    // Add additional CDN packages based on detected dependencies
    const additionalCDN = this.getAdditionalCDNPackages(dependencies);
    additionalCDN.forEach((script) => scripts.push(script));

    return scripts.join("\n        ");
  }

  private static getAdditionalCDNPackages(dependencies: any[]): string[] {
    const scripts: string[] = [];

    // Check for specific packages that have CDN versions
    dependencies.forEach((dep) => {
      switch (dep.name) {
        case "lodash":
          scripts.push(
            '<script src="https://unpkg.com/lodash@4.17.21/lodash.min.js"></script>'
          );
          break;
        case "axios":
          scripts.push(
            '<script src="https://unpkg.com/axios@1.6.0/dist/axios.min.js"></script>'
          );
          break;
        case "moment":
          scripts.push(
            '<script src="https://unpkg.com/moment@2.29.4/min/moment.min.js"></script>'
          );
          break;
        case "uuid":
          scripts.push(
            '<script src="https://unpkg.com/uuid@9.0.1/dist/umd/uuid.min.js"></script>'
          );
          break;
        // Add more CDN packages as needed
      }
    });

    return scripts;
  }

  private static generateScriptContent(allProcessedComponents: string): string {
    return `
      // Set up global variables for CDN packages
      const _ = window._ || {};
      const axios = window.axios || {};
      const moment = window.moment || {};
      const uuid = window.uuid || {};

      // Override console methods to capture output
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      function sendToParent(level, ...args) {
        try {
          window.parent.postMessage({
            type: 'console',
            level: level,
            message: args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ')
          }, '*');
        } catch (e) {
          // Ignore cross-origin errors
        }
      }

      console.log = function(...args) {
        originalLog.apply(console, args);
        sendToParent('log', ...args);
      };

      console.error = function(...args) {
        originalError.apply(console, args);
        sendToParent('error', ...args);
      };

      console.warn = function(...args) {
        originalWarn.apply(console, args);
        sendToParent('warn', ...args);
      };

       // Handle link clicks for navigation
       document.addEventListener('click', function(e) {
         if (e.target.tagName === 'A') {
           e.preventDefault();
           const url = e.target.href;
           if (url) {
             try {
               window.parent.postMessage({
                 type: 'navigate',
                 url: url
               }, '*');
             } catch (e) {
               // Fallback: open in new tab
               window.open(url, '_blank');
             }
           }
         }
       });

       // Enhanced error handling
       window.addEventListener('error', function(e) {
        const errorInfo = {
          message: e.error?.message || e.message,
          filename: e.filename || 'Unknown',
          lineno: e.lineno || 'Unknown',
          colno: e.colno || 'Unknown',
          stack: e.error?.stack || 'No stack trace available'
        };
        
        // Check if it's a Babel parsing error
        if (errorInfo.message.includes('return') && errorInfo.message.includes('outside of function')) {
          sendToParent('error', 'Babel Parsing Error: "return" outside of function. This usually means there is an issue with the component structure. Check your function declarations.');
        } else {
          sendToParent('error', 'Error in ' + errorInfo.filename + ':' + errorInfo.lineno + ':' + errorInfo.colno + ' - ' + errorInfo.message);
        }
        
        console.error('Global error:', errorInfo);
      });

      window.addEventListener('unhandledrejection', function(e) {
        const errorInfo = {
          reason: e.reason?.message || e.reason,
          stack: e.reason?.stack || 'No stack trace available'
        };
        
        sendToParent('error', 'Unhandled Promise Rejection: ' + errorInfo.reason);
        console.error('Unhandled promise rejection:', errorInfo);
      });

      // React Error Boundary
      class ErrorBoundary extends React.Component {
        constructor(props) {
          super(props);
          this.state = { hasError: false, error: null, errorInfo: null };
        }

        static getDerivedStateFromError(error) {
          return { hasError: true, error };
        }

        componentDidCatch(error, errorInfo) {
          this.setState({ errorInfo });
          const errorDetails = {
            componentStack: errorInfo.componentStack,
            error: error.message,
            stack: error.stack
          };
          
          sendToParent('error', 'React Error in Component: ' + error.message);
          console.error('React Error Boundary caught:', errorDetails);
        }

        render() {
          if (this.state.hasError) {
            return React.createElement('div', {
              style: {
                color: '#ff6b6b',
                padding: '20px',
                textAlign: 'center',
                fontFamily: 'monospace'
              }
            }, [
              React.createElement('h2', { key: 'title' }, 'React Component Error'),
              React.createElement('p', { key: 'message' }, this.state.error?.message || 'Unknown error'),
              React.createElement('details', { key: 'details' }, [
                React.createElement('summary', { key: 'summary' }, 'Error Details'),
                React.createElement('pre', {
                  key: 'stack',
                  style: {
                    background: '#333',
                    padding: '10px',
                    borderRadius: '5px',
                    textAlign: 'left',
                    overflow: 'auto',
                    fontSize: '12px',
                    marginTop: '10px'
                  }
                }, this.state.error?.stack || 'No stack trace available'),
                React.createElement('pre', {
                  key: 'componentStack',
                  style: {
                    background: '#333',
                    padding: '10px',
                    borderRadius: '5px',
                    textAlign: 'left',
                    overflow: 'auto',
                    fontSize: '12px',
                    marginTop: '10px'
                  }
                }, this.state.errorInfo?.componentStack || 'No component stack available')
              ])
            ]);
          }

          return this.props.children;
        }
      }

      try {
        // All components
        ${allProcessedComponents}

        // Render the app with error boundary (React 18)
        const appContainer = document.getElementById('root');
        const appRoot = ReactDOM.createRoot(appContainer);
        appRoot.render(
          React.createElement(ErrorBoundary, null,
            React.createElement(App)
          )
        );
      } catch (error) {
        console.error('React rendering error:', error);
        document.getElementById('root').innerHTML = 
          '<div style="color: #ff6b6b; padding: 20px; text-align: center; font-family: monospace;">' +
            '<h2>Initialization Error</h2>' +
            '<p>' + error.message + '</p>' +
            '<details>' +
              '<summary>Error Details</summary>' +
              '<pre style="background: #333; padding: 10px; border-radius: 5px; text-align: left; overflow: auto; font-size: 12px; margin-top: 10px;">' +
                error.stack +
              '</pre>' +
            '</details>' +
          '</div>';
      }
    `;
  }
}
