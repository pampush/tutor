export const combineDispatches = async (...funcs) => {
  for(const fn of funcs)
    await fn(); 
}