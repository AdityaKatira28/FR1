
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { X, Bot, Send, Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';
import { cn } from '@/shared/utils/utils';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistant = ({ isOpen, onClose }: AIAssistantProps) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    {
      type: 'assistant',
      content: 'Hello! I\'m your Security Investment AI Assistant. I can help you optimize your cybersecurity budget, analyze threats, and provide actionable insights. What would you like to know?'
    }
  ]);

  const quickActions = [
    {
      icon: Lightbulb,
      text: 'Optimize budget allocation',
      action: () => handleQuickAction('How can I optimize my current security budget allocation?')
    },
    {
      icon: AlertTriangle,
      text: 'Analyze current threats',
      action: () => handleQuickAction('What are the current top threats I should be concerned about?')
    },
    {
      icon: TrendingUp,
      text: 'ROI recommendations',
      action: () => handleQuickAction('Show me security investments with the highest ROI potential.')
    }
  ];

  const handleQuickAction = (actionMessage: string) => {
    setMessage(actionMessage);
    handleSendMessage(actionMessage);
  };

  const handleSendMessage = (msg?: string) => {
    const messageToSend = msg || message;
    if (!messageToSend.trim()) return;

    setConversation(prev => [...prev, { type: 'user', content: messageToSend }]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      if (messageToSend.toLowerCase().includes('budget') || messageToSend.toLowerCase().includes('allocation')) {
        response = 'Based on your current threat landscape and security metrics, I recommend reallocating 15% of your endpoint protection budget to network security. This could improve your overall security score by 12% and reduce potential breach costs by $450K annually.';
      } else if (messageToSend.toLowerCase().includes('threat')) {
        response = 'Current top threats include: 1) Advanced persistent threats targeting your cloud infrastructure (High priority), 2) Phishing campaigns against your remote workforce (Medium priority), 3) Supply chain vulnerabilities in third-party integrations (Medium priority). I recommend immediate attention to cloud security controls.';
      } else if (messageToSend.toLowerCase().includes('roi')) {
        response = 'Top ROI security investments for your organization: 1) Zero Trust Architecture implementation (2.3x ROI), 2) Advanced threat detection with ML (1.9x ROI), 3) Security awareness training program (1.7x ROI). These investments show measurable risk reduction within 6-12 months.';
      } else {
        response = 'I understand you\'re looking for security insights. I can help you with budget optimization, threat analysis, compliance planning, and ROI calculations. Could you be more specific about what aspect of your security posture you\'d like to improve?';
      }
      
      setConversation(prev => [...prev, { type: 'assistant', content: response }]);
    }, 1000);
  };

  return (
    <div className={cn(
      "fixed inset-y-0 right-0 w-96 bg-slate-900 border-l border-slate-800 transform transition-transform duration-300 ease-in-out z-50",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <Card className="h-full bg-slate-900 border-0 rounded-none">
        <CardHeader className="border-b border-slate-800">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Bot className="h-5 w-5 text-purple-500" />
              AI Security Assistant
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex flex-col h-full p-0">
          {/* Quick Actions */}
          <div className="p-4 border-b border-slate-800">
            <h4 className="text-sm font-medium text-slate-300 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={action.action}
                    className="w-full justify-start bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {action.text}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {conversation.map((msg, index) => (
              <div key={index} className={cn(
                "flex",
                msg.type === 'user' ? "justify-end" : "justify-start"
              )}>
                <div className={cn(
                  "max-w-[80%] p-3 rounded-lg text-sm",
                  msg.type === 'user' 
                    ? "bg-purple-600 text-white" 
                    : "bg-slate-800 text-slate-300"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about security investments..."
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={() => handleSendMessage()}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
