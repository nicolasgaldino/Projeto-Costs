import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <footer className={ styles.footer }>
        <ul className={ styles.socialList }>
          <li><a href="https://github.com/nicolasgaldino"><FaGithub /></a></li>
          <li><a href="https://www.linkedin.com/in/nícolas-galdino-esmael-8370ab199"><FaLinkedin /></a></li>
          <li><a href="https://twitter.com/galdino_esmael"><FaTwitter /></a></li>
          <li><a href="mailto:nicolasesmael1998@gmail.com"><SiGmail /></a></li>
        </ul>
        <p className={ styles.copyRight }><span>Costs</span> &copy; Nícolas Galdino 2022</p>
      </footer>
    </>
  )
}

export default Footer