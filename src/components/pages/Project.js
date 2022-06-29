import React from 'react';
import styles from './Project.module.css';
import { useParams } from 'react-router';
import Loading from '../layout/Loading';
import Container from '../layout/Container';

const Project = () => {

  const { id } = useParams();
  const [ project, setProject ] = React.useState([]);
  const [ showProjectForm, setShowProjectForm ] = React.useState(false);

  React.useEffect(() => {
    const url = `http://localhost:5000/projects/${id}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setProject(data)
    })
    .catch((err) => console.log(err));
  }, [id])

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project.name ? (
        <div className={ styles.projectDetails }>
          <Container customClass="column">
            <div className={ styles.detailsContainer }>
              <h1>Projeto: { project.name }</h1>
              <button
              className={ styles.btn }
              onClick={ toggleProjectForm }
              >
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={ styles.projectInfo }>
                  <p>
                    <span>Categoria:</span> { project.category.name }
                  </p>
                  <p>
                    <span>Orçamento total:</span> R${ project.budget }
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${ project.cost }
                  </p>
                </div>
              ) : (
                <div className={ styles.projectInfo }>
                  <p>Detalhes do projeto</p>
                </div>
                )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project