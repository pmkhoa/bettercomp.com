const excludeTopicList = [' ', '', 'whitepaper', 'Insight', 'Whitepaper'];

const excludeTypeList = [' '];

export const getFilterTopics = (resources: []) => {
  const topics = [
    ...new Set(
      resources
        .flatMap((doc: any) => doc.tags)
        .map((tag: any) => (typeof tag?.name === 'string' ? tag?.name.trim() : null)) // Trim spaces and convert non-strings to null
        .filter((tag: any) => tag && excludeTopicList.indexOf(tag) < 0)
        .sort((a: string, b: string) => a?.localeCompare(b, undefined, { sensitivity: 'base' }))
    ),
  ] as string[];
  topics.unshift('alltopics');

  return topics;
};

/*
const getContentTypes = (insights: []) => {
	const contentTypes = [
		...new Set(
			insights
				.map((doc: any) => doc._type)
				.sort((a: string, b: string) => a?.localeCompare(b, undefined, { sensitivity: 'base' }))
		),
	] as string[];
	contentTypes.unshift('all');

	return contentTypes;
};
 */

export const getFilterContentTypes = (filterTypes: []) => {
  const contentTypes = [
    ...new Set(
      filterTypes
        .flatMap((doc: any) => doc._type)
        .map((contentType: any) => (typeof contentType === 'string' ? contentType.trim() : null)) // Trim spaces and convert non-strings to null
        .filter((contentType: any) => contentType && excludeTypeList.indexOf(contentType) < 0)
        //@ts-expect-error: expecting
        .sort((a: string, b: string) => a?.localeCompare(b, undefined, { sensitivity: 'base' }))
    ),
  ] as string[];
  contentTypes.unshift('alltypes');

  return contentTypes;
};

export const getFilterTags = (resources: []) => {
  const topics = [
    ...new Set(
      resources
        .flatMap((doc: any) => doc.tags)
        .map((tag: any) => (typeof tag === 'string' ? tag.trim() : null)) // Trim spaces and convert non-strings to null
        .filter((tag: any) => tag && excludeTopicList.indexOf(tag) < 0)
        //@ts-expect-error: expecting
        .sort((a: string, b: string) => a?.localeCompare(b, undefined, { sensitivity: 'base' }))
    ),
  ] as string[];
  topics.unshift('alltags');

  return topics;
};
