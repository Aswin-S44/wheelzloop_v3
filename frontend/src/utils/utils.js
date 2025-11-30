import { compareAsc, format as formatDateFns, parseISO } from "date-fns";

export const formatDate = (date, dateFormat) => {
  if (!date) return "";
  const parsedDate = parseISO(date);
  return formatDateFns(parsedDate, dateFormat);
};

export const formatViews = (view) => {
  if (view > 999 && view < 99999) {
    return `${view} k`;
  } else if (view >= 100000 && view < 999999) {
    return `${view} Lakh`;
  } else if (view > 999999 && view < 9999999) {
    return `${view} M`;
  } else if (view > 10000000) {
    return `${view} Cr`;
  } else {
    return view;
  }
};

export const convertContentfullResponse = async (resp) => {
  const formattedResponse = [];

  if (resp && resp.length > 0) {
    resp.forEach((item, index) => {
      const descriptionContent = item.fields.description?.content;

      const plainDescription = descriptionContent
        ? descriptionContent
            .map((block) =>
              block.content
                ? block.content.map((textNode) => textNode.value).join("")
                : ""
            )
            .join("\n")
        : "Demo";

      const entry = {
        id: index + 1,
        slug: item.fields.title
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
        description: plainDescription,
        title: item.fields.title,
        image: item.fields.image?.fields?.file?.url || "",
      };

      formattedResponse.push(entry);
    });
  }

  return formattedResponse;
};
