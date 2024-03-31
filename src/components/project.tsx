import { ProjectType } from '../types';
import { getGitHubLogo } from '../constants';

type ProjectProps = {
  project: ProjectType;
}

export function Project({ project }: Readonly<ProjectProps>) {
  return (
    <div className="project">
      <div className="wrapper">
        <div className="image" style={{ backgroundImage: `url(${getGitHubLogo(project.repo)})` }}>
          <div className="overlay">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>
              <a
                href={project.link}
                className="button"
                target="_blank"
                aria-label={project.title}
                title={project.title}>
                Visit Site
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
