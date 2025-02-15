
const MessageSkeleton = ({ isSent = false }) => {
    return (
      <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4 px-4 w-[100%]`}>
        {/* Received message has avatar */}
        {!isSent && (
          <div className="h-9 w-9 rounded-full bg-gray-400 mr-2 animate-pulse"></div>
        )}
  
        <div className={`w-[40%] ${isSent ? 'ml-10' : 'mr-10'}`}>
          <div className={`rounded-xl p-3 ${isSent ? 'bg-blue-200' : 'bg-gray-300'} animate-pulse`}>
            {/* Random width text lines */}
            <div className="h-4 rounded bg-gray-100 mb-2 w-4/5"></div>
            <div className="h-4 rounded bg-gray-100 mb-2 w-3/4"></div>
            <div className="h-4 rounded bg-gray-100 w-1/2"></div>
          </div>
          
          
        </div>
      </div>
    );
  };

  export default MessageSkeleton;