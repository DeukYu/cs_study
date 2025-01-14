const fs = require('fs');
const path = require('path');

// 저장소 경로 설정
const basePath = './';
const readmePath = path.join(basePath, 'README.md');

// 폴더별로 Markdown 파일 탐색
function generateMarkdownLinks() {
  const folders = ['Network', 'Database', 'Etc']; // 폴더 리스트
  let markdownContent = `
# cs_study
[![Since](https://img.shields.io/badge/since-2025.01.12-333333.svg?style=flat-square)](https://gyoogle.github.io)
[![author](https://img.shields.io/badge/author-DeukYu-0066FF.svg?style=flat-square)](https://gyoogle.github.io)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FDeukYu%2Fcs_study&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)   
[![Watch on GitHub](https://img.shields.io/github/watchers/DeukYu/cs_study.svg?style=social)](https://github.com/gyoogle/tech-interview-for-developer/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/DeukYu/cs_study.svg?style=social)](https://github.com/gyoogle/tech-interview-for-developer/stargazers)
[![Fork on GitHub](https://img.shields.io/github/forks/DeukYu/cs_study.svg?style=social)](https://github.com/gyoogle/tech-interview-for-developer/network/members)   

### 개발자 전공 지식 &amp; 기술 면접 📖

**Collaborator**
- [이득유](https://github.com/DeukYu)
- [이원형](https://github.com/Upian)

**Commit convention rule** : 날짜-[주제]-내용-상태

## Computer Science
`;

  folders.forEach(folder => {
    const folderPath = path.join(basePath, folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.md'));
      if (files.length > 0) {
        markdownContent += `\n- ### ${folder}\n`;
        files.forEach(file => {
          const fileName = file.replace('.md', '');
          const link = `https://github.com/DeukYu/cs_study/blob/main/${folder}/${file}`;
          markdownContent += `    - [${fileName}](${link})\n`;
        });
      }
    }
  });

  return markdownContent;
}

// README 파일 업데이트
const updatedContent = generateMarkdownLinks();
fs.writeFileSync(readmePath, updatedContent);
console.log('README.md updated successfully!');