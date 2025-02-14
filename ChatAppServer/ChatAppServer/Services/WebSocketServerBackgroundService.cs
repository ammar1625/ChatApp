using WebSocketSharp.Server;

namespace ChatAppServer.Services
{

    public class WebSocketServerBackgroundService : BackgroundService
    {
        private WebSocketServer _webSocketServer;
        private const int Port = 8080;
        private const string Path = "/ws";

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _webSocketServer = new WebSocketServer(Port);
            _webSocketServer.AddWebSocketService<WebSocketBehaviorHandler>(Path);

            // Start the server
            _webSocketServer.Start();
           // Console.WriteLine($"WebSocket server started on ws://localhost:{Port}{Path}");

            // Keep the service running until cancellation is requested
            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(1000, stoppingToken);
            }

            // Cleanup
            _webSocketServer.Stop();
           // Console.WriteLine("WebSocket server stopped");
        }

        public override void Dispose()
        {
            _webSocketServer?.Stop();
            _webSocketServer = null;
            base.Dispose();
        }
    }
}
