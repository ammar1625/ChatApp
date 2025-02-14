using System.Threading.Tasks.Dataflow;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace ChatAppServer.Services
{
    public class WebSocketBehaviorHandler : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            base.OnMessage(e);

            
        }
    }
}
