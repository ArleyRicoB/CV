/* eslint-disable no-unused-vars */
import React from 'react';
import getContent from '../contentful/getContent';
import Print from '../components/print';

const Main = ({ _content }) => (
  <div>
    <section id="content" className="main-page container">
      <div className="header">
        <h1>Arley Sneyder Rico Bohórquez</h1>
        <h6>Software Developer</h6>
      </div>

      <div className="row content">
        <div className="col-sm-3 skills-and-info">
          <div>
            <h3>Info</h3>
          </div>
          <div>
            <h3>Skills</h3>
          </div>
          <div>
            <h3>Laguages</h3>
          </div>
        </div>

        <div className="col-sm-9 profile">
          <div className="profile-item">
            <h3>Profile</h3>
          </div>
          <div className="profile-item">
            <h3>Employment History</h3>
          </div>
          <div className="profile-item">
            <h3>Education</h3>
          </div>
        </div>
      </div>
    </section>

    <section>
      <Print id="content" />
    </section>
  </div>
);

export async function getServerSideProps() {
  const content = await getContent('/');

  return {
    props: { content },
  };
}

export default Main;
