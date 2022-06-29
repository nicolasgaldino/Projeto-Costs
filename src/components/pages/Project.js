import React from 'react';
import { parse, v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../projects/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import styles from './Project.module.css';
import ServiceCard from '../service/ServiceCard';

const Project = () => {

  const { id } = useParams();
  const [ project, setProject ] = React.useState([]);
  const [ showProjectForm, setShowProjectForm ] = React.useState(false);
  const [ showServiceForm, setShowServiceForm ] = React.useState(false);
  const [ message, setMessage ] = React.useState();
  const [ messageType, setMessageType ] = React.useState();
  const [ services, setServices ] = React.useState([]);

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
      setServices(data.services)
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
    setMessage('')
    const url = `http://localhost:5000/projects/${project.id}`;
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    if(newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, por favor verifique o valor do serviço.')
      setMessageType('error')
      project.services.pop()
      return false
    }

    project.cost = newCost

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project)
    })
    .then((response) => response.json())
    .then((data) => {
      setShowServiceForm(false)
    })
    .catch((err) => console.log(err));

  }

  function removeService() {}

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
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                  id={ service.id }
                  name={ service.name }
                  cost={ service.cost }
                  description={ service.description }
                  key={ service.id }
                  handleRemove={ removeService }
                  />
                ))
              } : {services.length === 0 && <p>Não há serviços.</p>}
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
