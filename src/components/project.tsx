import { ProjectType } from '../types';
import { getGitHubLogo } from '../constants';

type ProjectProps = {
  project: ProjectType;
}

export function Project({ project }: ProjectProps) {
  return (
    <div class="project">
      <div class="wrapper">
        <div class="image" style={{ backgroundImage: `url(${getGitHubLogo(project.repo)})` }}>
          <div class="overlay" tabIndex={0} aria-label={project.title}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>
              <a
                href={project.link}
                class="button"
                target="_blank"
                title={project.title}
              >
                Visit Site
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
