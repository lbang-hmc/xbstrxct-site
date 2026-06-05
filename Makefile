# Simple Pandoc blog builder
# Add new posts to POSTS; index is handled separately at the root

SITE_URL = https://xbstrxct.com

POSTS = heidegger \
simondon \
formal-methods-ancient-greece \
symbolic-reasoning-math-logic-cs \
lull-leibniz \
abstraction-lock-sicp

POST_OUTPUTS = $(addprefix posts/, $(addsuffix .html, $(POSTS)))

.PHONY: all clean

all: index.html $(POST_OUTPUTS) posts/style.css feed.xml

index.html: md/index.md templates/page.html
	pandoc -s $< \
		--template=templates/page.html \
		-o $@.tmp
	sed -E 's/href="([^".:#\/]+)"/href="posts\/\1.html"/g' $@.tmp > $@
	rm $@.tmp

posts/%.html: md/%.md templates/page.html
	pandoc -s $< \
		--template=templates/page.html \
		-o $@.tmp
	sed -E 's/href="([^".:#\/]+)"/href="\1.html"/g' $@.tmp > $@
	rm $@.tmp

posts/style.css: style.css
	cp style.css posts/

feed.xml: $(addprefix md/, $(addsuffix .md, $(POSTS))) templates/item.xml
	{ \
	  printf '<?xml version="1.0" encoding="UTF-8"?>\n'; \
	  printf '<rss version="2.0"><channel>\n'; \
	  printf '<title>XBSTRXCT</title>\n'; \
	  printf '<link>$(SITE_URL)</link>\n'; \
	  for slug in $(POSTS); do \
	    pandoc -s md/$$slug.md \
	      --template=templates/item.xml \
	      --variable=slug:$$slug \
	      --variable=site_url:$(SITE_URL); \
	  done; \
	  printf '</channel></rss>\n'; \
	} > $@

clean:
	rm -f index.html posts/*.html feed.xml
