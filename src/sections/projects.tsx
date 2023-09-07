import { Project } from '../components';
import { ProjectsType } from '../types';

type ProjectsProps = {
  projects: ProjectsType
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects">
      <div>
        <h2>Side <span>Projects</span></h2>
        <p>{projects.blurb}</p>
        <div class="content">
          {projects.content.map((p, idx) => (
            <Project key={idx} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
