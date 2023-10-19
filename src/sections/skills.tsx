import { uid } from 'uid';
import { Skill } from '../components';
import { SkillsType } from '../types';

type SkillsProps = {
  skills: SkillsType;
}

export function Skills({ skills }: Readonly<SkillsProps>) {
  return (
    <section id="skills">
      <div>
        <h2>My <span>Skills</span></h2>
        <p>{skills.blurb}</p>
        <div className="content">
          {skills.content.map((s) => (
            <Skill key={uid()} skill={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
