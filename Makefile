# Simple Pandoc blog builder
# Add new pages by adding them to the PAGES variable below

PAGES = index \
heidegger \
simondon \
formal-methods-ancient-greece \
symbolic-reasoning-math-logic-cs \
lull-leibniz \
abstraction-lock-sicp


SOURCES = $(addprefix md/, $(addsuffix .md, $(PAGES)))
OUTPUTS = $(addprefix public/, $(addsuffix .html, $(PAGES)))

.PHONY: all clean

all: $(OUTPUTS) public/style.css

public/%.html: md/%.md templates/page.html
	pandoc -s $< \
		--template=templates/page.html \
		-o $@.tmp
	sed -E 's/href="([^".:#\/]+)"/href="\1.html"/g' $@.tmp > $@
	rm $@.tmp

public/style.css: style.css
	cp style.css public/

clean:
	rm -rf public/*.html
