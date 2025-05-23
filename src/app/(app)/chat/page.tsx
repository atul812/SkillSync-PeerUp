
"use client"; 

import { useState, useEffect } from "react"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Paperclip, Search, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext"; 
import { getBotResponse, type ChatBotInput, type ChatBotOutput } from "@/ai/flows/chat-bot-flow";

// Expanded initial data for contacts
const contactsInitialData = [
  { id: "user_jane_doe", name: "Jane Doe", avatarUrl: "https://placehold.co/40x40.png", lastMessage: "Sure, I can help with that!", unread: 2, online: true },
  { id: "user_john_smith", name: "John Smith", avatarUrl: "https://placehold.co/40x40.png", lastMessage: "Thanks for the session!", unread: 0, online: false },
  { id: "user_sarah_miller", name: "Sarah Miller", avatarUrl: "https://placehold.co/40x40.png", lastMessage: "Mostly web development with Flask or Django.", unread: 1, online: true },
  { id: "user_david_lee", name: "David Lee", avatarUrl: "https://placehold.co/40x40.png", lastMessage: "I'm focusing on scalability patterns right now.", unread: 0, online: false },
  { id: "user_ai_helper", name: "SkillSync & PeerUp AI Bot", avatarUrl: "https://placehold.co/40x40.png", lastMessage: "How can I assist you today?", unread: 0, online: true },
];

// Initial messages are specific to the initially selected contact
const initialMessagesForJane = [
  { id: "msg1_jane", sender: "Jane Doe", text: "Hey Alex! I saw you're looking to learn Data Structures. I can help with that.", time: "10:30 AM", self: false },
  { id: "msg2_jane", sender: "Alex Johnson (Mock User)", text: "Hi Jane! That would be amazing. I'm particularly struggling with graphs.", time: "10:32 AM", self: true }, 
  { id: "msg3_jane", sender: "Jane Doe", text: "No problem! Graphs can be tricky. When are you free for a quick session?", time: "10:33 AM", self: false },
];

const initialMessagesForSarah = [
  { id: "msg1_sarah", sender: "Sarah Miller", text: "Hi! I saw you're teaching Python. I'd love to learn!", time: "Yesterday 2:15 PM", self: false },
  { id: "msg2_sarah", sender: "You", text: "Hey Sarah! Sure, I can help. What aspects of Python are you interested in?", time: "Yesterday 2:17 PM", self: true },
  { id: "msg3_sarah", sender: "Sarah Miller", text: "Mostly web development with Flask or Django.", time: "Yesterday 2:20 PM", self: false },
];

const initialMessagesForDavid = [
  { id: "msg1_david", sender: "David Lee", text: "Need help with System Design. Saw you're learning it too. Want to study together?", time: "Mon 9:00 AM", self: false },
  { id: "msg2_david", sender: "You", text: "That's a great idea, David! I'm focusing on scalability patterns right now.", time: "Mon 9:05 AM", self: true },
];

const initialMessagesMapData: Record<string, Array<{id: string; sender: string; text: string; time: string; self: boolean}>> = {
    [contactsInitialData[0].id]: initialMessagesForJane, 
    [contactsInitialData[1].id]: [
      { id: "msg1_john", sender: "John Smith", text: "Great session on React! Really helped.", time: "Tues 4:00 PM", self: false },
      { id: "msg2_john", sender: "You", text: "Glad I could help, John! Let me know if you have more questions.", time: "Tues 4:02 PM", self: true },
      { id: "msg3_john", sender: "John Smith", text: "Thanks for the session!", time: "Tues 4:03 PM", self: false },
    ], 
    [contactsInitialData[2].id]: initialMessagesForSarah,
    [contactsInitialData[3].id]: initialMessagesForDavid,
    [contactsInitialData[4].id]: [ { id: "bot-msg1", sender: "SkillSync & PeerUp AI Bot", text: "Hello! How can I help you match skills today?", time: "9:00 AM", self: false }],
};


export default function ChatPage() {
  const { currentUserProfile } = useAuth(); 
  const [contactList, setContactList] = useState(contactsInitialData);
  const [selectedContact, setSelectedContact] = useState(contactsInitialData[0]);
  const [allMessages, setAllMessages] = useState(initialMessagesMapData);
  const [newMessage, setNewMessage] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const currentMessages = allMessages[selectedContact.id] || [];

  const getInitials = (name: string) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length === 0 || !names[0]) return "U";
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0].toUpperCase() + (names[names.length - 1]?.[0]?.toUpperCase() || "")).slice(0,2);
  }


  const updateContactLastMessage = (contactId: string, lastMsgText: string, incrementUnread = false) => {
    setContactList(prevContacts => 
      prevContacts.map(c => 
        c.id === contactId ? { ...c, lastMessage: lastMsgText, unread: incrementUnread && c.id !== selectedContact?.id ? c.unread + 1 : c.unread } : c
      )
    );
    // Ensure selectedContact also reflects the latest message if it's the one being updated.
    // This is important if updateContactLastMessage is called for the selected contact.
     if (selectedContact?.id === contactId) {
        setSelectedContact(prevSelected => {
            if (!prevSelected) return null; // Should not happen if a contact is selected
            return { ...prevSelected, lastMessage: lastMsgText };
        });
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !currentUserProfile) return;

    const messageToSend = {
      id: `msg${currentMessages.length + 1}-${Date.now()}`,
      sender: currentUserProfile.name, 
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      self: true,
    };

    // Add user's message to the chat for the selected contact
    setAllMessages(prevAllMessages => ({
        ...prevAllMessages,
        [selectedContact.id]: [...(prevAllMessages[selectedContact.id] || []), messageToSend]
    }));
    
    // Update last message in contact list and for the selected contact view
    updateContactLastMessage(selectedContact.id, messageToSend.text);
    
    const currentInput = newMessage.trim();
    setNewMessage("");
    
    console.log("Sending message:", messageToSend, "to contact:", selectedContact.name);


    if (selectedContact.id === "user_ai_helper") {
      setIsBotTyping(true);
      try {
        const botInput: ChatBotInput = { userInput: currentInput };
        const aiResponse: ChatBotOutput = await getBotResponse(botInput);
        
        const botReply = {
          id: `bot-reply-${Date.now()}`,
          sender: "SkillSync & PeerUp AI Bot",
          text: aiResponse.botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          self: false,
        };

        setAllMessages(prevAllMessages => ({
          ...prevAllMessages,
          [selectedContact.id]: [...(prevAllMessages[selectedContact.id] || []), botReply]
        }));
        updateContactLastMessage(selectedContact.id, botReply.text, true); // Increment unread for bot reply

      } catch (error) {
        console.error("Error getting AI response:", error);
        const errorReply = {
          id: `bot-error-${Date.now()}`,
          sender: "SkillSync & PeerUp AI Bot",
          text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          self: false,
        };
        setAllMessages(prevAllMessages => ({
          ...prevAllMessages,
          [selectedContact.id]: [...(prevAllMessages[selectedContact.id] || []), errorReply]
        }));
        updateContactLastMessage(selectedContact.id, errorReply.text, true); // Increment unread for error reply
      } finally {
        setIsBotTyping(false);
      }
    }
  };

  const handleContactSelect = (contact: typeof contactsInitialData[0]) => {
    setSelectedContact(prevSelected => {
      if (prevSelected?.id === contact.id) return prevSelected; // No change if same contact
      // Reset unread count for the newly selected contact
      setContactList(prevList => prevList.map(c => c.id === contact.id ? {...c, unread: 0} : c));
      return contact;
    });
  };

  useEffect(() => {
    // If selected contact changes, update its state in contactList to mark unread as 0
    if (selectedContact) {
       setContactList(prevList => prevList.map(c => c.id === selectedContact.id ? {...c, unread: 0} : c));
    }
  }, [selectedContact?.id]);


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
                <p className={`text-xs truncate ${contact.unread > 0 && contact.id !== selectedContact?.id ? 'font-bold text-primary' : 'text-muted-foreground'}`}>{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && contact.id !== selectedContact?.id && (
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
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.self ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right`}>{msg.time}</p>
                  </div>
                </div>
              ))}
               {isBotTyping && selectedContact.id === "user_ai_helper" && (
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md p-3 rounded-lg bg-card text-card-foreground shadow-sm">
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <p className="text-sm italic">AI Bot is typing...</p>
                    </div>
                  </div>
                </div>
              )}
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
                  disabled={!currentUserProfile || (selectedContact.id === "user_ai_helper" && isBotTyping)} 
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim() || !currentUserProfile || (selectedContact.id === "user_ai_helper" && isBotTyping)}>
                  <Send className="h-5 w-5" /> Send
                </Button>
              </div>
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

    