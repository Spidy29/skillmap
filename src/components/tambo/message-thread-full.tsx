"use client";

import type { messageVariants } from "@/components/tambo/message";
import {
  MessageInput,
  MessageInputError,
  MessageInputFileButton,
  MessageInputMcpPromptButton,
  MessageInputMcpResourceButton,
  MessageInputSubmitButton,
  MessageInputTextarea,
  MessageInputToolbar,
} from "@/components/tambo/message-input";
import {
  MessageSuggestions,
  MessageSuggestionsList,
  MessageSuggestionsStatus,
} from "@/components/tambo/message-suggestions";
import { ScrollableMessageContainer } from "@/components/tambo/scrollable-message-container";
import { MessageInputMcpConfigButton } from "@/components/tambo/message-input";
import { ThreadContainer, useThreadContainerContext } from "./thread-container";
import {
  ThreadContent,
  ThreadContentMessages,
} from "@/components/tambo/thread-content";
import { ResumeUploader } from "@/components/chat/ResumeUploader";
import {
  ThreadHistory,
  ThreadHistoryHeader,
  ThreadHistoryList,
  ThreadHistoryNewButton,
  ThreadHistorySearch,
} from "@/components/tambo/thread-history";
import { useMergeRefs } from "@/lib/thread-hooks";
import type { Suggestion } from "@tambo-ai/react";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

/**
 * Props for the MessageThreadFull component
 */
export interface MessageThreadFullProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controls the visual styling of messages in the thread.
   * Possible values include: "default", "compact", etc.
   * These values are defined in messageVariants from "@/components/tambo/message".
   * @example variant="compact"
   */
  variant?: VariantProps<typeof messageVariants>["variant"];
}

/**
 * A full-screen chat thread component with message history, input, and suggestions
 */
export const MessageThreadFull = React.forwardRef<
  HTMLDivElement,
  MessageThreadFullProps
>(({ className, variant, ...props }, ref) => {
  const { containerRef, historyPosition } = useThreadContainerContext();
  const mergedRef = useMergeRefs<HTMLDivElement | null>(ref, containerRef);

  const threadHistorySidebar = (
    <ThreadHistory position={historyPosition}>
      <ThreadHistoryHeader />
      <ThreadHistoryNewButton />
      <ThreadHistorySearch />
      <ThreadHistoryList />
    </ThreadHistory>
  );

  const defaultSuggestions: Suggestion[] = [
    {
      id: "suggestion-1",
      title: "🎯 Analyze my skills",
      detailedSuggestion: "I'm a React developer. Show me what skills I need for Full-Stack.",
      messageId: "skills-query",
    },
    {
      id: "suggestion-2",
      title: "📊 Career roadmap",
      detailedSuggestion: "Create a path for me to become a Tech Lead in 2 years.",
      messageId: "roadmap-query",
    },
    {
      id: "suggestion-3",
      title: "💼 Job matching",
      detailedSuggestion: "Find jobs that match my current skills.",
      messageId: "jobs-query",
    },
    {
      id: "suggestion-4",
      title: "🎤 Interview prep",
      detailedSuggestion: "How do I prepare for a Google interview?",
      messageId: "interview-query",
    },
  ];

  return (
    <div className="flex h-full w-full">
      {/* Thread History Sidebar - rendered first if history is on the left */}
      {historyPosition === "left" && threadHistorySidebar}

      <ThreadContainer
        ref={mergedRef}
        disableSidebarSpacing
        className={className}
        {...props}
      >
        <ScrollableMessageContainer className="p-4">
          {/* Welcome Greeting - Minimalist B&W */}
          <div className="flex flex-col items-center justify-center text-center px-6 py-8">
            {/* Clean Title */}

            {/* Clean Title */}
            <h1 className="text-6xl md:text-8xl font-black text-foreground/10 tracking-tighter mb-2">
              ASCEND
            </h1>

            {/* Subtle Subtitle */}
            <p className="text-sm md:text-base font-medium text-foreground/40 mb-8 tracking-widest uppercase">
              Career Intelligence
            </p>

            {/* Faded Tags using simple text, no borders */}
            <div className="flex flex-wrap gap-6 justify-center">
              {["Skills", "Roadmaps", "Interview", "Jobs"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-foreground/30 hover:text-foreground/60 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <ThreadContent variant={variant}>
            <ThreadContentMessages />
          </ThreadContent>
        </ScrollableMessageContainer>

        {/* Message suggestions status */}
        <MessageSuggestions>
          <MessageSuggestionsStatus />
        </MessageSuggestions>

        {/* Message input */}
        <div className="px-4 pb-4">
          <MessageInput>
            <MessageInputTextarea placeholder="Type a message to start your career journey..." />
            <MessageInputToolbar>
              <ResumeUploader onTextExtracted={(text, filename) => {
                const prompt = `Here is my resume content from ${filename}:\n\n${text}\n\nBased on this resume, please create a detailed Skill Tree analysis of my proficient skills.`;
                // We need to inject this into the input. The cleanest way is to dispatch a custom event or use the context if accessible.
                // Since this component doesn't have direct access to the input context here, we can use a workaround or move this inside MessageInput.
                // However, MessageInputTextarea is where the state lives.

                // Let's try appending to the textarea if possible, or just alerting the user to paste it.
                // Better approach: The ResumeUploader should probably be INSIDE MessageInputToolbar to access context? 
                // No, context usage is restricted. 

                // Workaround: We will use a global event or simply locate the textarea and update it.
                const textarea = document.querySelector('textarea[data-slot="message-input-textarea"]') as HTMLTextAreaElement;
                if (textarea) {
                  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
                  nativeInputValueSetter?.call(textarea, prompt);
                  textarea.dispatchEvent(new Event('input', { bubbles: true }));
                  textarea.focus();
                }
              }} />
              <MessageInputFileButton />
              <MessageInputMcpPromptButton />
              <MessageInputMcpResourceButton />
              {/* Uncomment this to enable client-side MCP config modal button */}
              <MessageInputMcpConfigButton />
              <MessageInputSubmitButton />
            </MessageInputToolbar>
            <MessageInputError />
          </MessageInput>
        </div>

        {/* Message suggestions */}
        <MessageSuggestions initialSuggestions={defaultSuggestions}>
          <MessageSuggestionsList />
        </MessageSuggestions>
      </ThreadContainer>

      {/* Thread History Sidebar - rendered last if history is on the right */}
      {historyPosition === "right" && threadHistorySidebar}
    </div>
  );
});
MessageThreadFull.displayName = "MessageThreadFull";

/**
 * Premium feature card for welcome section
 */
function FeatureCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="group p-4 rounded-xl bg-card/50 border border-border hover:border-foreground/20 hover:bg-card/80 transition-all duration-300 cursor-default">
      <div className="text-2xl mb-2">{emoji}</div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
