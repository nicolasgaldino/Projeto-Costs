import React from 'react';
import styles from './Project.module.css';
import { useParams } from 'react-router';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../projects/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';

const Project = () => {

  const { id } = useParams();
  const [ project, setProject ] = React.useState([]);
  const [ showProjectForm, setShowProjectForm ] = React.useState(false);
  const [ showServiceForm, setShowServiceForm ] = React.useState(false);
  const [ message, setMessage ] = React.useState();
  const [ messageType, setMessageType ] = React.useState();

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

  function editPost(project) {
    setMessage('')

    if(project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto.')
      setMessageType('error')
      return false
    }

    const url = `http://localhost:5000/projects/${project.id}`;

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    .then((response) => response.json())
    .then((data) => {
      setProject(data);
      setShowProjectForm(false)
      setMessage('Projeto atualizado.')
      setMessageType('success')
    })
    .catch((err) => console.log(err));
  }

  function createService() {
    
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={ styles.projectDetails }>
          <Container customClass="column">
            {message && 
              <Message type={ messageType } msg={ message } />}
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
                  <ProjectForm
                  btnText="Concluir edição"
                  projectData={ project }
                  handleSubmit={ editPost }
                  />
                </div>
                )}
            </div>
            <div className={ styles.serviceFormContainer }>
              <h2>Adicione um serviço:</h2>
              <button
                className={ styles.btn }
                onClick={ toggleServiceForm }
              >
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
              <div className={ styles.projectInfo }>
                {showServiceForm &&
                <ServiceForm
                handleSubmit={ createService }
                btnText="Adicionar serviço"
                projectData={ project }
                />
                }
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              <p>Itens de serviços</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project
