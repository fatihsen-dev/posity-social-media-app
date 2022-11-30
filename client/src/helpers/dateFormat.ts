export const formatDate = (date: any) => {
   const d = new Date(date);
   const c = new Date();
   if (d.getFullYear() < c.getFullYear()) {
      return `${c.getFullYear() - d.getFullYear()} year ago`;
   } else if (d.getMonth() < c.getMonth()) {
      return `${c.getMonth() - d.getMonth()} month ago`;
   } else if (d.getDate() < c.getDate()) {
      return `${c.getDate() - d.getDate()} day ago`;
   } else if (d.getHours() < c.getHours()) {
      return `${c.getHours() - d.getHours()} hour ago`;
   } else if (d.getMinutes() < c.getMinutes()) {
      return `${c.getMinutes() - d.getMinutes()} minute ago`;
   } else {
      return "Yeni";
   }
};
export const formatDateMin = (date: any) => {
   const d = new Date(date);
   const c = new Date();
   if (d.getFullYear() < c.getFullYear()) {
      return `${c.getFullYear() - d.getFullYear()}y`;
   } else if (d.getMonth() < c.getMonth()) {
      return `${c.getMonth() - d.getMonth()}mo`;
   } else if (d.getDate() < c.getDate()) {
      return `${c.getDate() - d.getDate()}d`;
   } else if (d.getHours() < c.getHours()) {
      return `${c.getHours() - d.getHours()}h`;
   } else if (d.getMinutes() < c.getMinutes()) {
      return `${c.getMinutes() - d.getMinutes()}m`;
   } else {
      return "New";
   }
};
