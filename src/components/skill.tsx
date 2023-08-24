import Hint from 'preact-hint';
import { SkillType } from '../types';
import { getSimpleIcon } from '../constants';

type SkillProps = {
  skill: SkillType;
}

export function Skill({ skill }: SkillProps) {
  return (
    <span class="skill">
      <Hint attribute="alt">
        <img
          src={getSimpleIcon(skill.iconName)}
          alt={skill.title}
        />
      </Hint>
    </span>
  );
}
