import formatRichText from '../lib/formatRichText';

const formatData = ({ sys, fields }) => {
  const type = sys?.contentType?.sys?.id?.toLowerCase() || '';

  if (type === 'section') {
    const { identifier, description, employmentItems } = fields;

    let employmentItemsFormatted = [];
    if (employmentItems) {
      employmentItemsFormatted = employmentItems.map((item) => formatData(item));
    }
    return {
      [identifier]: {
        description: formatRichText(description),
        ...(employmentItemsFormatted && { employmentItems: employmentItemsFormatted }),
      },
    };
  }
  if (type === 'employmenthistoryitem') {
    const {
      employmentTitle,
      identifier,
      from,
      to,
      projectsAndDescription,
    } = fields;

    return {
      employmentTitle,
      identifier,
      from,
      to,
      projectsAndDescription: formatRichText(projectsAndDescription),
    };
  }

  return null;
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
