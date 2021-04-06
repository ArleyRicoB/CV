import formatRichText from '../lib/formatRichText';

const formatData = ({ sys, fields }) => {
  const { identifier, description } = fields;
  const type = sys?.contentType?.sys?.id || '';

  switch (type.toLowerCase()) {
    case 'section':
      return { [identifier]: formatRichText(description) };

    default:
      return null;
  }
};

const formatPage = (page) => {
  try {
    const data = {};
    const { fields } = page.items[0];
    const formattedContent = fields?.content?.map((item) => formatData(item)) || [];

    const content = formattedContent?.reduce(
      (newItem, current) => Object.assign(newItem, current),
      data,
    );

    return JSON.parse(JSON.stringify(content));
  } catch (e) {
    return [];
  }
};

export default formatPage;
