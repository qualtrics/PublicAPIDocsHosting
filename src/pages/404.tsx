import React from "react";
import Layout from "../components/layout";

const NotFoundPage = ({location}) => {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 300)
  }, [show])

  if (!show) return (
    <Layout>
    </Layout>)

  return (
  <Layout>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that does not exist... the sadness.</p>
  </Layout>)
};

export default NotFoundPage;
