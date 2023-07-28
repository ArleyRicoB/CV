import React from 'react';
import dynamic from 'next/dynamic';
import getContent from '../contentful/getContent';

const Interweave = dynamic(() => import('interweave'), { ssr: false });
const Print = dynamic(() => import('../components/print'), { ssr: false });

const Main = ({ content }) => {
  const {
    profile, education, skills, languages, details, header, history,
  } = content;

  return (
    <div className="container my-5">
      <section id="cv-container" className="main-page p-0">
        <div className="row">
          <div className="col-12 header">
            <Interweave
              key="header"
              attributes={{ className: 'header' }}
              tagName="div"
              content={header.description[0]}
            />
          </div>

          <div className="col-12 content">
            <div className="row">
              <div className="col-sm-4 col-12 skills-and-info">
                <div>
                  <h3>Information</h3>
                  <Interweave
                    key="information"
                    attributes={{ className: 'information' }}
                    tagName="div"
                    content={details.description[0]}
                  />
                </div>
                <div>
                  <h3>Skills</h3>
                  <Interweave
                    key="skills"
                    attributes={{ className: 'skills' }}
                    tagName="div"
                    content={skills.description[0]}
                  />
                </div>
                <div>
                  <h3>Laguages</h3>
                  <Interweave
                    key="information"
                    attributes={{ className: 'information' }}
                    tagName="div"
                    content={languages.description[0]}
                  />
                </div>
              </div>
              <div className="col-sm-8 col-12 profile">
                <div className="profile-item">
                  <h3>Profile</h3>
                  <Interweave
                    key="information"
                    attributes={{ className: 'information' }}
                    tagName="div"
                    content={profile.description[0]}
                  />
                </div>
                <div className="profile-item">
                  <h3>Employment History</h3>
                  {history?.employmentItems.map((element, index) => (
                    <div key={`history-${index}`}>
                      <h4 className="text-uppercase font-weight-bold">
                        {element.employmentTitle}
                      </h4>
                      <div>{`${element.from} - ${element.to}`}</div>
                      <Interweave
                        key={`history-${index}`}
                        attributes={{ className: 'history' }}
                        tagName="div"
                        content={element.projectsAndDescription[0]}
                      />
                    </div>
                  ))}
                </div>
                <div className="profile-item">
                  <h3>Education</h3>
                  <Interweave
                    key="education"
                    attributes={{ className: 'education' }}
                    tagName="div"
                    content={education.description[0]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-3 mb-5">
        <Print id="cv-container" />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const content = await getContent('/');

  return {
    props: { content },
  };
}

export default Main;
