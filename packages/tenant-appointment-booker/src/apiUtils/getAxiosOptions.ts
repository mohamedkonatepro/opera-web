const getAxiosOptions = () => {
  const headers = {
    Authorization: `Bearer ${process.env.API_KEY}`,
  };

  return {
    headers,
  };
};

export default getAxiosOptions;
