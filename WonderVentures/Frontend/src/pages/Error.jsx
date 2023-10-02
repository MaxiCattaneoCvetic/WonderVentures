import { useRouteError } from 'react-router-dom';
import PageContent from '../layouts/PageContent/Index';

const Error = () => {
  const error = useRouteError();

  let title = 'Oops!, something went wrong';
  let message = 'An error ocurred';

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource page';
  }

  return <PageContent title={title}>{message}</PageContent>;
};

export default Error;
