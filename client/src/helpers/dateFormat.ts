import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export const formatDate = (date: any) => {
   if (date) {
      return timeAgo.format(new Date(date));
   }
};
export const formatDateMin = (date: any) => {
   if (date) {
      return timeAgo.format(new Date(date), "mini-now");
   }
};
