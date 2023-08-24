import { Skill } from '../components';
import { SkillsType } from '../types';

type SkillsProps = {
  skills: SkillsType;
}

export function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills">
      <div>
        <h2>My <span>Skills</span></h2>
        <p>{skills.blurb}</p>
        <div class="content">
          {skills.content.map((s) => <Skill skill={s} />)}
        </div>
      </div>
    </section>
  );
}
