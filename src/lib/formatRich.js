/* eslint-disable no-case-declarations */
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { INLINES } from '@contentful/rich-text-types';

const makeDocumentObject = (nodesArray) => ({
  content: nodesArray,
  data: {},
  nodeType: 'document',
});

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node) => {
      const { uri } = node.data;

      if (uri.includes('https')) {
        return `<a href="${uri}" class="rich-link lazy-load" target="_blank">${documentToHtmlString(makeDocumentObject(node.content))}</a>`;
      }

      return `<a href="${uri}" class="rich-link lazy-load">${documentToHtmlString(makeDocumentObject(node.content))}</a>`;
    },
  },
};

const iterateContent = (content) => {
  let currentHtmlString = '';
  let currentHtmlNodeArray = [];
  let currentContentArray = [];
  const contentArray = [];

  content.forEach((node) => {
    switch (node.nodeType) {
      case 'embedded-asset-block':
        currentHtmlString = currentHtmlString.concat(
          documentToHtmlString(
            makeDocumentObject(currentHtmlNodeArray),
            options,
          ),
        );
        currentHtmlNodeArray = [];

        const fileFields = node?.data?.target?.fields;

        if (fileFields.file.contentType.includes('image')) {
          currentHtmlString = currentHtmlString.concat(
            `<img src="https:${fileFields.file.url}" alt="contentImg" class="rich-link lazyload" />`,
          );
        }
        break;

      case 'hr':
        currentHtmlString = currentHtmlString.concat(
          documentToHtmlString(
            makeDocumentObject(currentHtmlNodeArray),
            options,
          ),
        );

        currentHtmlNodeArray = [];

        currentContentArray.push(currentHtmlString);
        currentHtmlString = '';

        contentArray.push(currentContentArray);
        currentContentArray = [];
        break;

      default:
        currentHtmlNodeArray.push(node);
        break;
    }
  });

  return contentArray.flat();
};

const formatRich = (richContent) => {
  if (!richContent) {
    return null;
  }

  try {
    const contentFormatted = iterateContent(richContent.content);
    return contentFormatted;
  } catch {
    return null;
  }
};

export default formatRich;
