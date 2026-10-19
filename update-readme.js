const fs = require('fs');
const path = require('path');

// 저장소 경로 설정
const basePath = './';
const readmePath = path.join(basePath, 'README.md');

// 재귀적으로 Markdown 파일 탐색
function generateMarkdownLinks(folder, indent = '', baseFolder = '') {
  const folderPath = path.join(basePath, folder);
  let markdownContent = '';

  if (fs.existsSync(folderPath)) {
    const items = fs.readdirSync(folderPath);
    const subfolders = items.filter(item => fs.lstatSync(path.join(folderPath, item)).isDirectory());
    const files = items.filter(item => item.endsWith('.md'));

    // 현재 폴더 내 Markdown 파일 추가
    if (files.length > 0) {
      const displayFolder = baseFolder || folder; // baseFolder가 있으면 사용
      markdownContent += `\n${indent}- ### ${displayFolder}\n`;
      files.forEach(file => {
        const fileName = file.replace('.md', '');
        const encodedFolder = encodeURIComponent(folder).replace(/%2F/g, '/'); // 폴더 이름 인코딩
        const encodedFile = encodeURIComponent(file); // 파일 이름 인코딩
        const link = `https://github.com/DeukYu/cs_study/blob/main/${encodedFolder}/${encodedFile}`;
        markdownContent += `${indent}    - [${fileName}](${link})\n`;
      });
    }

    // 하위 폴더 탐색
    subfolders.forEach(subfolder => {
      const subfolderName = path.basename(subfolder); // 하위 폴더 이름
      markdownContent += generateMarkdownLinks(
        path.join(folder, subfolder), 
        indent, 
        subfolderName // 하위 폴더 이름만 전달
      );
    });
  }

  return markdownContent;
}

// README 파일 업데이트
function updateReadme() {
  const csFolders = ['Operating System', 'Data Structure', 'Network', 'Database', 'Etc']; // Computer Science 폴더 리스트
  const languageFolder = 'Language'; // Language 폴더
  const interviewFolder = 'Interview'; // Interview 폴더

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

  // Computer Science 섹션 생성
  csFolders.forEach(folder => {
    markdownContent += generateMarkdownLinks(folder);
  });

  // Language 섹션 생성
  markdownContent += '\n## Language\n';
  markdownContent += generateMarkdownLinks(languageFolder, '', 'Language');

  // Interview 섹션 생성 (실제 면접 기출 질문)
  markdownContent += '\n## Interview\n';
  markdownContent += generateMarkdownLinks(interviewFolder, '', '기출 질문');

  fs.writeFileSync(readmePath, markdownContent.trim());
  console.log('README.md updated successfully!');
}

updateReadme();
