# Simple Pandoc blog builder
# Add new posts to POSTS; index is handled separately at the root

POSTS = heidegger \
simondon \
formal-methods-ancient-greece \
symbolic-reasoning-math-logic-cs \
lull-leibniz \
abstraction-lock-sicp

POST_OUTPUTS = $(addprefix posts/, $(addsuffix .html, $(POSTS)))

.PHONY: all clean

all: index.html $(POST_OUTPUTS) posts/style.css

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

clean:
	rm -f index.html posts/*.html
