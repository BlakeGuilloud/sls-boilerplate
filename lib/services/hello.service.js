export const fetchHello = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve('Such sync');
    }, 150)
  );