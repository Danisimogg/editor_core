import { $createLinkNode } from "@lexical/link";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import * as React from "react";
import { Button } from "@/components/ui/button";
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
              <div style={{ padding: " 40px" }}>
                <div className="w-full p-4 border border-gray-200 bg-gray-50 rounded-t-xl dark:border-gray-600 dark:bg-gray-700">
                  <div className="grid grid-cols-3">
                    <div className="col-span-2 sm:col-span-1">
                      <a
                        href="https://github.com/themesberg/flowbite/blob/main/content/components/navbar.md"
                        rel="noopener nofollow noreferrer"
                        className="inline-flex items-center justify-center h-9 mr-3 px-3 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        <svg
                          className="w-3.5 h-3.5 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>{" "}
                        Edit on GitHub
                      </a>
                    </div>

                    <div className="items-center justify-center hidden col-span-1 space-x-2 sm:flex">
                      <button
                        data-tooltip-target="default-navbar-example-full-screen-tooltip"
                        className="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        <span className="sr-only">Toggle full view</span>
                        <svg
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14v4m-4 1h8M1 10h18M2 1h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                          ></path>
                        </svg>
                      </button>

                      <div
                        id="default-navbar-example-full-screen-tooltip"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        style={{
                          position: "absolute",
                          inset: " auto auto 0px 0px",
                          margin: "0px",
                          transform: "translate3d(540.5px, -368.5px, 0px)",
                        }}
                        data-popper-placement="top"
                      >
                        Toggle full screen
                        <div
                          className="tooltip-arrow"
                          data-popper-arrow=""
                          style={{
                            position: "absolute",
                            left: "0px",
                            transform: " translate3d(67.5px, 0px, 0px)",
                          }}
                        ></div>
                      </div>

                      <button
                        data-tooltip-target="default-navbar-example-tablet-tooltip"
                        className="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-tablet-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        <span className="sr-only">Toggle tablet view</span>
                        <svg
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7.5 16.5h3M2 1h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                          ></path>
                        </svg>
                      </button>

                      <div
                        id="default-navbar-example-tablet-tooltip"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        style={{
                          position: "absolute",
                          inset: " auto auto 0px 0px",
                          margin: "0px",
                          transform: " translate3d(582.5px, -368.5px, 0px)",
                        }}
                        data-popper-placement="top"
                      >
                        Toggle tablet view
                        <div
                          className="tooltip-arrow"
                          data-popper-arrow=""
                          style={{
                            position: "absolute",
                            left: "0px",
                            transform: "translate3d(69.5px, 0px, 0px)",
                          }}
                        ></div>
                      </div>

                      <button
                        data-tooltip-target="default-navbar-example-mobile-tooltip"
                        className="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-mobile-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        <span className="sr-only">Toggle mobile view</span>
                        <svg
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 14h12M1 4h12M6.5 16.5h1M2 1h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                          ></path>
                        </svg>
                      </button>

                      <div
                        id="default-navbar-example-mobile-tooltip"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        style={{
                          position: "absolute",
                          inset: "auto auto 0px 0px",
                          margin: "0px",
                          transform: " translate3d(623.5px, -368.5px, 0px)",
                        }}
                        data-popper-placement="top"
                      >
                        Toggle mobile view
                        <div
                          className="tooltip-arrow"
                          data-popper-arrow=""
                          style={{
                            position: "absolute",
                            left: "0px",
                            transform: "translate3d(72.5px, 0px, 0px)",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-end col-span-1">
                      <button
                        data-tooltip-target="default-navbar-example-toggle-dark-mode-tooltip"
                        type="button"
                        data-toggle-dark="light"
                        className="flex items-center w-9 h-9 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        <svg
                          data-toggle-icon="moon"
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 20"
                        >
                          <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
                        </svg>
                        <svg
                          data-toggle-icon="sun"
                          className="hidden w-3.5 h-3.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
                        </svg>
                        <span className="sr-only">Toggle dark/light mode</span>
                      </button>

                      <div
                        id="default-navbar-example-toggle-dark-mode-tooltip"
                        role="tooltip"
                        className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 opacity-0 invisible"
                        style={{
                          position: "absolute",
                          inset: " auto auto 0px 0px",
                          margin: "0px",
                          transform: "translate3d(964.5px, -368.5px, 0px)",
                        }}
                        data-popper-placement="top"
                      >
                        Toggle dark mode
                      </div>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none mt-5">
                  <div className="editor-shell">
                    <Editor />
                    <Button> Следующий урок </Button>
                  </div>
                </div>
                <Settings />
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
