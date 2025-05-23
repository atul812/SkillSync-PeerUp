
"use client"; 

import { useState, useEffect } from "react"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Paperclip, Search } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext"; 

// Initial data for contacts
const contactsInitialData = [
  { id: "user_jane_doe", name: "Jane Doe", avatarUrl: "https://placehold.co/40x40.png", lastMessage: "Sure, I can help with that!", unread: 2, online: true },
  { id: "user_john_smith", name: "John Smith", avatarUrl: "https://placehold.co/40x40.png", lastMessage: "Thanks for the session!", unread: 0, online: false },
  { id: "user_ai_helper", name: "SkillSync & PeerUp AI Bot", avatarUrl: "https://placehold.co/40x40.png", lastMessage: "How can I assist you today?", unread: 0, online: true },
];

// Initial messages are specific to the initially selected contact
const initialMessagesForJane = [
  { id: "msg1", sender: "Jane Doe", text: "Hey Alex! I saw you're looking to learn Data Structures. I can help with that.", time: "10:30 AM", self: false },
  { id: "msg2", sender: "Alex Johnson (Mock User)", text: "Hi Jane! That would be amazing. I'm particularly struggling with graphs.", time: "10:32 AM", self: true }, 
  { id: "msg3", sender: "Jane Doe", text: "No problem! Graphs can be tricky. When are you free for a quick session?", time: "10:33 AM", self: false },
];

const initialMessagesMapData: Record<string, Array<{id: string; sender: string; text: string; time: string; self: boolean}>> = {
    [contactsInitialData[0].id]: initialMessagesForJane, 
    [contactsInitialData[1].id]: [], 
    [contactsInitialData[2].id]: [ { id: "bot-msg1", sender: "SkillSync & PeerUp AI Bot", text: "Hello! How can I help you match skills today?", time: "9:00 AM", self: false }],
};


export default function ChatPage() {
  const { currentUserProfile } = useAuth(); 
  const [contactList, setContactList] = useState(contactsInitialData);
  const [selectedContact, setSelectedContact] = useState(contactsInitialData[0]);
  const [allMessages, setAllMessages] = useState(initialMessagesMapData);
  const [newMessage, setNewMessage] = useState("");

  const currentMessages = allMessages[selectedContact.id] || [];

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const updateContactLastMessage = (contactId: string, lastMsgText: string) => {
    setContactList(prevContacts => 
      prevContacts.map(c => 
        c.id === contactId ? { ...c, lastMessage: lastMsgText } : c
      )
    );
    // If the selected contact is the one being updated, refresh its state
    if (selectedContact?.id === contactId) {
      setSelectedContact(prevSelected => {
        const updated = contactList.find(c => c.id === contactId);
        return updated || prevSelected; // Fallback to previous if somehow not found
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !currentUserProfile) return;

    const messageToSend = {
      id: `msg${currentMessages.length + 1}-${Date.now()}`,
      sender: currentUserProfile.name, 
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      self: true,
    };

    console.log("Sending message:", messageToSend, "to contact:", selectedContact.id); 

    // Add user's message to the chat
    setAllMessages(prevAllMessages => ({
        ...prevAllMessages,
        [selectedContact.id]: [...(prevAllMessages[selectedContact.id] || []), messageToSend]
    }));

    // Update last message for the contact
    updateContactLastMessage(selectedContact.id, messageToSend.text);
    
    // If message is to AI Bot, simulate a reply
    if (selectedContact.id === "user_ai_helper") {
      setTimeout(() => {
        const botReply = {
          id: `bot-reply-${Date.now()}`,
          sender: "SkillSync & PeerUp AI Bot",
          text: "Thanks for your message! I'm a mock AI assistant, learning to help with skill matching. How can I (theoretically) assist you?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          self: false,
        };
        setAllMessages(prevAllMessages => ({
          ...prevAllMessages,
          [selectedContact.id]: [...(prevAllMessages[selectedContact.id] || []), botReply]
        }));
        // Update bot's last message to its reply
        updateContactLastMessage(selectedContact.id, botReply.text);
      }, 1500);
    }
    
    setNewMessage("");
  };

  const handleContactSelect = (contact: typeof contactsInitialData[0]) => {
    setSelectedContact(contact);
  };


  return (
    <div className="flex h-[calc(100vh-4rem-1px)] border-t"> {/* Adjust height based on header */}
      {/* Contacts List */}
      <div className="w-1/3 border-r bg-sidebar-background text-sidebar-foreground flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <h2 className="text-xl font-semibold">Messages</h2>
          <div className="relative mt-2">
            <Input placeholder="Search contacts..." className="bg-background text-foreground pl-8" />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contactList.map(contact => (
            <div
              key={contact.id}
              className={`p-3 flex items-center gap-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer ${contact.id === selectedContact?.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
              onClick={() => handleContactSelect(contact)}
            >
              <Avatar className="h-10 w-10 relative">
                <AvatarImage src={contact.avatarUrl} alt={contact.name} data-ai-hint="user avatar small"/>
                <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                {contact.online && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-sidebar-background" />}
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-medium truncate">{contact.name}</p>
                <p className={`text-xs truncate ${contact.unread > 0 ? 'font-bold text-primary' : 'text-muted-foreground'}`}>{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">{contact.unread}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col bg-background">
        {selectedContact ? (
          <>
            <div className="p-4 border-b flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedContact.avatarUrl} alt={selectedContact.name} data-ai-hint="user avatar chat" />
                <AvatarFallback>{getInitials(selectedContact.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedContact.name}</p>
                <p className="text-xs text-muted-foreground">{selectedContact.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-secondary/20">
              {currentMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.self ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground shadow-sm'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.self ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-background">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" disabled><Paperclip className="h-5 w-5" /></Button>
                <Input
                  placeholder="Type your message..."
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={!currentUserProfile} 
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim() || !currentUserProfile}>
                  <Send className="h-5 w-5" /> Send
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Chat is client-side only for prototype purposes. Messages are not saved.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <MessageSquare className="h-24 w-24 mb-4" />
            <p className="text-lg">Select a conversation to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
