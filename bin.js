#!/usr/bin/env node
const query = process.argv[2]
const queryLowerCase = query.toLowerCase()

;(async () => {
  const parser = new (require('rss-parser'))()
  const input = await parser.parseURL('https://www.everycrsreport.com/rss.xml')
  const output = new (require('rss'))({
    title: `CRS Reports: ${query}`
  })
  input.items.forEach(item => {
    const { title, link, description, pubDate } = item
    if (title.toLowerCase().includes(queryLowerCase)) {
      output.item({ title, description, url: link, date: pubDate })
    }
  })
  process.stdout.write(output.xml({ indent: true }))
})()
