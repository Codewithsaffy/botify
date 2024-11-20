import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyCode from "../buttons/CopyCode";

export default function MarkdownRenderer() {
   const markdown = `
  # The Ultimate Guide to HTML 🖥️
  
  HTML (HyperText Markup Language) is the foundation of the web. It allows you to structure your content using tags and attributes.
  
  ---
  
  ## Table of Contents 📚
  1. [What is HTML?](#what-is-html)
  2. [HTML Document Structure](#html-document-structure)
  3. [HTML Elements](#html-elements)
  4. [HTML Attributes](#html-attributes)
  5. [HTML Forms](#html-forms)
  6. [HTML Multimedia](#html-multimedia)
  7. [HTML Tables](#html-tables)
  8. [Conclusion](#conclusion)
  
  ---
  
  ## What is HTML?
  
  HTML stands for **HyperText Markup Language**. It is used to describe the structure of web pages. HTML consists of **elements**, which define different parts of a webpage.
  
  \`\`\`html
  <!DOCTYPE html>
  <html>
    <head>
      <title>Welcome to HTML</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
      <p>This is a simple HTML document.</p>
    </body>
  </html>
  \`\`\`
  
  ---
  
  ## HTML Document Structure
  
  An HTML document typically consists of the following structure:
  
  1. **\`<!DOCTYPE>\`**: Declares the document type.
  2. **\`<html>\`**: The root element.
  3. **\`<head>\`**: Contains meta information, like title and links.
  4. **\`<body>\`**: Contains the visible content of the page.
  
  ### Example:
  
  \`\`\`html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>HTML Document Structure</title>
    </head>
    <body>
      <h1>Welcome to HTML!</h1>
    </body>
  </html>
  \`\`\`
  
  ---
  
  ## HTML Elements
  
  HTML elements are the building blocks of a webpage. Each element has a start tag and an end tag.
  
  ### Common Elements:
  
  - **Headings** (\`<h1>\` to \`<h6>\`):
    \`\`\`html
    <h1>This is a heading</h1>
    <h2>This is a subheading</h2>
    \`\`\`
  
  - **Paragraphs** (\`<p>\`):
    \`\`\`html
    <p>This is a paragraph of text.</p>
    \`\`\`
  
  - **Links** (\`<a>\`):
    \`\`\`html
    <a href="https://example.com">Visit Example</a>
    \`\`\`
  
  - **Lists** (\`<ul>\` and \`<ol>\`):
    \`\`\`html
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
    \`\`\`
  
  ---
  
  ## HTML Attributes
  
  Attributes provide additional information about an element. Common attributes include:
  
  - **\`id\`** and **\`class\`**:
    \`\`\`html
    <div id="main-content" class="container">
      This is a div with an ID and a class.
    </div>
    \`\`\`
  
  - **\`src\`** for Images:
    \`\`\`html
    <img src="image.jpg" alt="A descriptive text" />
    \`\`\`
  
  - **\`href\`** for Links:
    \`\`\`html
    <a href="https://example.com">Go to Example</a>
    \`\`\`
  
  ---
  
  ## HTML Forms
  
  Forms are used to collect user input. A typical form includes input fields, buttons, and labels.
  
  ### Example:
  
  \`\`\`html
  <form action="/submit" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required />
    <button type="submit">Submit</button>
  </form>
  \`\`\`
  
  ---
  
  ## HTML Multimedia
  
  HTML supports images, videos, and audio.
  
  ### Image Example:
  \`\`\`html
  <img src="example.jpg" alt="An example image" />
  \`\`\`
  
  ### Video Example:
  \`\`\`html
  <video controls>
    <source src="example.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  \`\`\`
  
  ---
  
  ## HTML Tables
  
  Tables are used to display data in a tabular format.
  
  ### Example:
  
  \`\`\`html
  <table border="1">
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>John</td>
      <td>30</td>
    </tr>
    <tr>
      <td>Jane</td>
      <td>25</td>
    </tr>
  </table>
  \`\`\`
  
  ---
  
  ## Conclusion
  
  HTML is the foundation of every webpage you see. Once you master HTML, you can move on to styling with **CSS** and adding interactivity with **JavaScript**.
  
  > "The journey of a thousand miles begins with a single step." – Start your HTML journey today! 🚀
  
  ### Resources:
  
  - [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
  - [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
  
  ---
  
  Made with ❤️ by **[Your Name]**.
  `;
  

  return (
    <div className="markdown-content prose max-w-[700px]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            return !inline && match ? (
              <div className="relative">
                <CopyCode codeString={codeString} node={node} />
                <SyntaxHighlighter
                  style={dracula}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
