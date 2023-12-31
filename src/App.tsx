import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { $createLinkNode } from "@lexical/link";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import * as React from "react";
import { isDevPlayground } from "./appSettings";
import { SettingsContext, useSettings } from "./context/SettingsContext";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import Editor from "./Editor";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import DocsPlugin from "./plugins/DocsPlugin";
import PasteLogPlugin from "./plugins/PasteLogPlugin";
import { TableContext } from "./plugins/TablePlugin";
import TestRecorderPlugin from "./plugins/TestRecorderPlugin";
import TypingPerfPlugin from "./plugins/TypingPerfPlugin";
import Settings from "./Settings";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import EditorPage from "./pages/EditorPage/EditorPage";

console.warn(
  "If you are profiling the playground app, please ensure you turn off the debug view. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting."
);

function prepopulatedRichText() {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    const heading = $createHeadingNode("h1");
    heading.append($createTextNode("Welcome to the playground"));
    root.append(heading);
    const quote = $createQuoteNode();
    quote.append(
      $createTextNode(
        `In case you were wondering what the black box at the bottom is – it's the debug view, showing the current state of the editor. ` +
          `You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.`
      )
    );
    root.append(quote);
    const paragraph = $createParagraphNode();
    paragraph.append(
      $createTextNode("The playground is a demo environment built with "),
      $createTextNode("@lexical/react").toggleFormat("code"),
      $createTextNode("."),
      $createTextNode(" Try typing in "),
      $createTextNode("some text").toggleFormat("bold"),
      $createTextNode(" with "),
      $createTextNode("different").toggleFormat("italic"),
      $createTextNode(" formats.")
    );
    root.append(paragraph);
    const paragraph2 = $createParagraphNode();
    paragraph2.append(
      $createTextNode(
        "Make sure to check out the various plugins in the toolbar. You can also use #hashtags or @-mentions too!"
      )
    );
    root.append(paragraph2);
    const paragraph3 = $createParagraphNode();
    paragraph3.append(
      $createTextNode(`If you'd like to find out more about Lexical, you can:`)
    );
    root.append(paragraph3);
    const list = $createListNode("bullet");
    list.append(
      $createListItemNode().append(
        $createTextNode(`Visit the `),
        $createLinkNode("https://lexical.dev/").append(
          $createTextNode("Lexical website")
        ),
        $createTextNode(` for documentation and more information.`)
      ),
      $createListItemNode().append(
        $createTextNode(`Check out the code on our `),
        $createLinkNode("https://github.com/facebook/lexical").append(
          $createTextNode("GitHub repository")
        ),
        $createTextNode(`.`)
      ),
      $createListItemNode().append(
        $createTextNode(`Playground code can be found `),
        $createLinkNode(
          "https://github.com/facebook/lexical/tree/main/packages/lexical-playground"
        ).append($createTextNode("here")),
        $createTextNode(`.`)
      ),
      $createListItemNode().append(
        $createTextNode(`Join our `),
        $createLinkNode("https://discord.com/invite/KmG4wQnnD9").append(
          $createTextNode("Discord Server")
        ),
        $createTextNode(` and chat with the team.`)
      )
    );
    root.append(list);
    const paragraph4 = $createParagraphNode();
    paragraph4.append(
      $createTextNode(
        `Lastly, we're constantly adding cool new features to this playground. So make sure you check back here when you next get a chance :).`
      )
    );
    root.append(paragraph4);
  }
}

function App() {
  const {
    settings: { isCollab, emptyEditor, measureTypingPerf },
  } = useSettings();

  const initialConfig = {
    editable: true,
    editorState: isCollab
      ? null
      : emptyEditor
      ? undefined
      : localStorage.getItem("draft") || prepopulatedRichText,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              <div
                style={{
                  padding: " 40px",
                  background: "#f4f4f5",
                  height: "100%",
                }}
              >
                <div className="prose max-w-none mt-5">
                  <div className="editor-shell">
                    <Tabs defaultValue="account">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Text Mode</TabsTrigger>
                        <TabsTrigger value="password">Design Mode</TabsTrigger>
                      </TabsList>
                      <TabsContent value="account">
                        <ContextMenu>
                          <ContextMenuTrigger>
                            <Editor />
                          </ContextMenuTrigger>

                          <ContextMenuContent className="w-64">
                            <ContextMenuItem inset>
                              Back
                              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuItem inset disabled>
                              Forward
                              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuItem inset>
                              Reload
                              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuSub>
                              <ContextMenuSubTrigger inset>
                                More Tools
                              </ContextMenuSubTrigger>
                              <ContextMenuSubContent className="w-48">
                                <ContextMenuItem>
                                  Save Page As...
                                  <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuItem>
                                  Create Shortcut...
                                </ContextMenuItem>
                                <ContextMenuItem>
                                  Name Window...
                                </ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem>
                                  Developer Tools
                                </ContextMenuItem>
                              </ContextMenuSubContent>
                            </ContextMenuSub>
                            <ContextMenuSeparator />
                            <ContextMenuCheckboxItem checked>
                              Show Bookmarks Bar
                              <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                            </ContextMenuCheckboxItem>
                            <ContextMenuCheckboxItem>
                              Show Full URLs
                            </ContextMenuCheckboxItem>
                            <ContextMenuSeparator />
                            <ContextMenuRadioGroup value="pedro">
                              <ContextMenuLabel inset>People</ContextMenuLabel>
                              <ContextMenuSeparator />
                              <ContextMenuRadioItem value="pedro">
                                Pedro Duarte
                              </ContextMenuRadioItem>
                              <ContextMenuRadioItem value="colm">
                                Colm Tuite
                              </ContextMenuRadioItem>
                            </ContextMenuRadioGroup>
                          </ContextMenuContent>
                        </ContextMenu>
                      </TabsContent>
                      <TabsContent value="password">
                        <div>
                          <EditorPage />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                {/* <Settings /> */}
                {/* {isDevPlayground ? <DocsPlugin /> : null}
              {isDevPlayground ? <PasteLogPlugin /> : null}
              {isDevPlayground ? <TestRecorderPlugin /> : null}
              {measureTypingPerf ? <TypingPerfPlugin /> : null} */}
              </div>
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </>
  );
}

export default function () {
  return (
    <SettingsContext>
      <App />
    </SettingsContext>
  );
}
