import { uid } from 'uid';
import { Project } from '../components';
import { ProjectsType } from '../types';

type ProjectsProps = {
  projects: ProjectsType;
}

export function Projects({ projects }: Readonly<ProjectsProps>) {
  return (
    <section id="projects">
      <div>
        <h2>Side <span>Projects</span></h2>
        <p>{projects.blurb}</p>
        <div className="content">
          {projects.content.map((p) => (
            <Project key={uid()} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
