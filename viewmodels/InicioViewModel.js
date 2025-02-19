const useInicioViewModel = (navigation) => {
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return {
    navigateTo,
  };
};

export default useInicioViewModel;