# markdown-scripts

A collection of JavaScript that processes various markdown, meta data, etc., including obsidian.

All scripts run independently. (run standalone)

## 한국어

마크다운 데이터를 다양한 목적으로 변환해주는 스크립트 모음입니다.

모든 스크립트는 패키지를 사용하지 않고 독립적인 js 파일로 동작하게 작성되었습니다.

### notion_to_obsidian.js

[Notion-to-Obsidian-Converter](https://github.com/connertennery/Notion-to-Obsidian-Converter)

에서 가져온 스크립트입니다

```bash
node notion_to_obsidian.js [대상경로]
```

괄호 처리 등에서 일부 데이터가 유효하지 않게 변환되며, 이미지 경로 처리에도 오류가 있는 것 같습니다만, 그럼에도 심플한 문서나 데이터의 변환에서는 아주 유용했습니다.

### meta_title_to_filename.js

메타 태그의 `title: `로 지정된 내용을 파일명으로 바꿔줍니다.

파일명으로 치환하는 과정에서 파일명으로 사용 불가능한 문자는 제거됩니다.

```bash
node meta_title_to_file.js
```

### upsert_markdown_tag.js

특정 tag를 일괄로 파일에 추가하면, 옵시디언 dataview로 조회하기 좋아서, 특정 폴더에 있는 모든 md 파일에 대해서 `tag: [약속된태그]` 를 추가해줍니다.
`tags:` 형태가 더 유리하기 때문에, 이 스크립트를 사용한 뒤에 tag_to_tags.js도 수행하시길 권장합니다.

```bash
node upsert_markdown_tag.js
```

### tag_to_tags.js

옵시디언에서 `tag:` 로 지정된 메타 데이터는, 리스트로 다뤄지지 못하고, 리스트로 편집 할 경우

```markdown
tags: 
- 태그1
- 태그2
- 태그3
```

위와 같은 tags: 형태로 유지하는 것이 좋습니다.

옵시디언 v1.4.5의 태그 편집기를 이용할 경우나, dataview를 통해서 tag를 뿌려줄 때를 위해서 일관성있게 변환해주고, tag: 메타 대신 tags: 를 사용하기 위해 사용하시면 됩니다.

```bash
node tag_to_tags.js
```

### markdown_table_to_md.js

마크다운 테이블로 정의되어있는 데이터를 개별 파일로 변환하기 위해서 사용합니다.

범용적인 구조가 아니다보니 컬럼 형태에 따라서 하드 코딩된 컬럼명과 메타 데이터로 변환 될 규격에 대한 수정이 필요합니다.

옵시디언 dataview에서 마크다운 테이블보다 개별 파일과 메타데이터로 구성되어있는 것이 관리나, 각종 가공에 유리해서 이용했습니다.

```bash
node markdown_table_to_md.js
```

## English

This is a collection of scripts that convert Markdown data for various purposes.

All scripts are written to operate as independent js files without using packages.

### notion_to_obsidian.js

[Notion-to-Obsidian-Converter](https://github.com/connertennery/Notion-to-Obsidian-Converter)

This is a script taken from

```bash
node notion_to_obsidian.js [target path]
```

Some data is converted to invalid due to parentheses processing, etc., and there seems to be an error in image path processing, but it was still very useful for converting simple documents or data.

### meta_title_to_filename.js

Changes the content specified as `title: ` in the meta tag to the file name.

In the process of replacing the file name, characters that cannot be used in the file name are removed.

```bash
node meta_title_to_file.js
```

### upsert_markdown_tag.js

If you add a specific tag to a file in batches, it is easy to search with Obsidian dataview, so add `tag: [promised tag]` to all md files in a specific folder.
Since the `tags:` form is more advantageous, we recommend that you also run tag_to_tags.js after using this script.

```bash
node upsert_markdown_tag.js
```

### tag_to_tags.js

In Obsidian, metadata designated as `tag:` cannot be handled as a list, and when edited as a list,

```markdown
tags:
- Tag 1
- Tag 2
- Tag 3
```

It is recommended to keep it in the tags: format as above.

When using the tag editor of Obsidian v1.4.5 or when distributing tags through dataview, you can convert consistently and use tags: instead of tag: meta.

```bash
node tag_to_tags.js
```

### markdown_table_to_md.js

It is used to convert data defined as a markdown table into individual files.

Since it is not a general-purpose structure, modifications to the hard-coded column names and specifications to be converted to metadata are required depending on the column type.

I used Obsidian DataView because it is composed of individual files and metadata rather than Markdown tables, which is more advantageous for management and various processing.

```bash
node markdown_table_to_md.js
```