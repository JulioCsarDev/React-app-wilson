//* 2. In img tag: <img src={toAbsoluteUrl('/media/avatars/300-2.jpg')} />
const toAbsoluteUrl = (pathname: string): string => {
  const baseUrl = import.meta.env.BASE_URL;

  if (baseUrl && baseUrl !== "/") {
    return import.meta.env.BASE_URL + pathname;
  } else {
    return pathname;
  }
};

export { toAbsoluteUrl };
