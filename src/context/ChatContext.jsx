import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

function ChatProvider({ children }) {
  const { currentUser } = useAuth();
  const initialState = {
    chatID: 'null',
    user: {},
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'changeUser':
        return {
          ...state,
          user: action.payload,
          chatID:
            currentUser.uid > action.paylod
              ? currentUser.uid + action.paylod
              : action.paylod + currentUser.uid,
        };

      default:
        throw new Error('Unknown action');
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined)
    throw new Error('ChatContext was use otuside ChatProvider');
  return context;
}

export { ChatProvider, useChat };
