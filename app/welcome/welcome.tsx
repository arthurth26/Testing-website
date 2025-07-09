import React from 'react';

export function Welcome() {
  const [message, setMessage] = React.useState<string>('');
  const [fadeMessage, setFadeMessage] = React.useState<string>('');
  const [visible, setVisible] = React.useState<boolean>(true);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim() !== '') {
      setFadeMessage(message);
      setMessage('');
      setVisible(false);
      setTimeout(() => setVisible(false), 0);
    }
  };

  React.useEffect(()=> {
    let timer: NodeJS.Timeout;
    if (!visible && fadeMessage) {
      timer = setTimeout(() => {
        setVisible(true);
        setFadeMessage('')
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [visible, fadeMessage]);


  return (
    <main className="grid justify-center pb-4">
      <div>
        <h1 className="content-center text-center text-[100px] font-bold text-gray-200 dark:text-gray-200">
          Scream into the void
        </h1>
      </div>
      <div>
        {(!message && !fadeMessage) ? 
          <p className='pt-40 text-center text-2xl text-gray-200 dark:text-gray-200'>Type something to send it into the void</p> :
          <p className={`pt-40 text-center text-2xl text-gray-200 dark:text-gray-200 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'} `}>{fadeMessage||message}</p>}
      </div>
      <div className="flex items-baseline justify-center">
        <input placeholder="Type your message here and press enter to sent" className="mt-60 p-2 border rounded w-full text-teal-200 dark:text-teal-200 bg-black" value={message} onChange={(e)=> setMessage(e.target.value)} onKeyDown={handleKeyPress}/>
      </div>
    </main>
  );
}


