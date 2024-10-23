import React from 'react';
import MessageList from './MessageList';
import Header from './Header';
import Footer from './Footer';
function Chat() {
    return (
        <>
            <div className='relative min-h-screen'>
                <Header />
                <div className='max-w-6xl mx-auto p-4 mt-16'>
                    <MessageList />
                </div>
                <div className='absolute bottom-[-100px] left-0 w-full'>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Chat