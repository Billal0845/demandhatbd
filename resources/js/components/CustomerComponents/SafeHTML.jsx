import React from "react";

const SafeHTML = ({ html, className = "" }) => {
    if (!html) return null;

    return (
        <div
            className={`
                prose prose-sm sm:prose-base font-hindSiliguri
                /* Ensure Bold is visible */
                prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white
                /* Ensure Lists are visible */
                prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5
               
                prose-p:my-2 
                prose-p:text-lg 
                prose-li:my-0 
                prose-ul:my-2
                /* Images */
                prose-img:rounded-xl prose-img:mx-auto
                /* Text Colors */
                prose-p:text-gray-800 dark:prose-p:text-gray-300
                prose-headings:text-gray-900 dark:prose-headings:text-white
                dark:prose-invert max-w-none 
                ${className}
            `}
        >
            <style
                dangerouslySetInnerHTML={{
                    __html: `
               
                .font-hindSiliguri mark {
                    background-color: #ffc0cb; 
                    color: inherit;
                    padding: 0 2px;
                    border-radius: 2px;
                }
                /* Ensure bold works even if font weight is tricky */
                .font-hindSiliguri strong, .font-hindSiliguri b {
                    font-weight: 700 !important;
                }
            `,
                }}
            />
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
};

export default SafeHTML;
