import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <footer className={ styles.footer }>
        <ul className={ styles.socialList }>
          <li><a href="https://github.com/nicolasgaldino" rel="external noreferrer" target="_blank"><FaGithub /></a></li>
          <li><a href="https://www.linkedin.com/in/nícolas-galdino-esmael-8370ab199"  rel="external noreferrer" target="_blank"><FaLinkedin /></a></li>
          <li><a href="https://twitter.com/galdino_esmael" rel="external noreferrer" target="_blank"><FaTwitter /></a></li>
          <li><a href="https://www.instagram.com/galdino_esmael/" rel="external noreferrer" target="_blank"><FaInstagram /></a></li>
          <li><a href="mailto:nicolasesmael1998@gmail.com"  rel="external noreferrer" target="_blank"><SiGmail /></a></li>
        </ul>
        <p className={ styles.copyRight }><span>Costs</span> &copy; Nícolas Galdino 2022</p>
      </footer>
    </>
  )
}

export default Footer