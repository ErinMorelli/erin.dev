import Hint from 'preact-hint';
import { SkillType } from '../types';
import { getSimpleIcon } from '../constants';

type SkillProps = {
  skill: SkillType;
}

export function Skill({ skill }: Readonly<SkillProps>) {
  return (
    <span className="skill">
      <Hint attribute="alt">
        <img
          src={getSimpleIcon(skill.iconName)}
          alt={skill.title}
        />
      </Hint>
    </span>
  );
}
