(function() {
  var bcv_parser;

  bcv_parser = require("../../js/mk_bcv_parser.js").bcv_parser;

  describe("Parsing", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.options.osis_compaction_strategy = "b";
      return p.options.sequence_combination_strategy = "combine";
    });
    it("should round-trip OSIS references", function() {
      var bc, bcv, bcv_range, book, books, i, len, results;
      p.set_options({
        osis_compaction_strategy: "bc"
      });
      books = ["Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1Sam", "2Sam", "1Kgs", "2Kgs", "1Chr", "2Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1Cor", "2Cor", "Gal", "Eph", "Phil", "Col", "1Thess", "2Thess", "1Tim", "2Tim", "Titus", "Phlm", "Heb", "Jas", "1Pet", "2Pet", "1John", "2John", "3John", "Jude", "Rev"];
      results = [];
      for (i = 0, len = books.length; i < len; i++) {
        book = books[i];
        bc = book + ".1";
        bcv = bc + ".1";
        bcv_range = bcv + "-" + bc + ".2";
        expect(p.parse(bc).osis()).toEqual(bc);
        expect(p.parse(bcv).osis()).toEqual(bcv);
        results.push(expect(p.parse(bcv_range).osis()).toEqual(bcv_range));
      }
      return results;
    });
    it("should round-trip OSIS Apocrypha references", function() {
      var bc, bcv, bcv_range, book, books, i, j, len, len1, results;
      p.set_options({
        osis_compaction_strategy: "bc",
        ps151_strategy: "b"
      });
      p.include_apocrypha(true);
      books = ["Tob", "Jdt", "GkEsth", "Wis", "Sir", "Bar", "PrAzar", "Sus", "Bel", "SgThree", "EpJer", "1Macc", "2Macc", "3Macc", "4Macc", "1Esd", "2Esd", "PrMan", "Ps151"];
      for (i = 0, len = books.length; i < len; i++) {
        book = books[i];
        bc = book + ".1";
        bcv = bc + ".1";
        bcv_range = bcv + "-" + bc + ".2";
        expect(p.parse(bc).osis()).toEqual(bc);
        expect(p.parse(bcv).osis()).toEqual(bcv);
        expect(p.parse(bcv_range).osis()).toEqual(bcv_range);
      }
      p.set_options({
        ps151_strategy: "bc"
      });
      expect(p.parse("Ps151.1").osis()).toEqual("Ps.151");
      expect(p.parse("Ps151.1.1").osis()).toEqual("Ps.151.1");
      expect(p.parse("Ps151.1-Ps151.2").osis()).toEqual("Ps.151.1-Ps.151.2");
      p.include_apocrypha(false);
      results = [];
      for (j = 0, len1 = books.length; j < len1; j++) {
        book = books[j];
        bc = book + ".1";
        results.push(expect(p.parse(bc).osis()).toEqual(""));
      }
      return results;
    });
    return it("should handle a preceding character", function() {
      expect(p.parse(" Gen 1").osis()).toEqual("Gen.1");
      expect(p.parse("Matt5John3").osis()).toEqual("Matt.5,John.3");
      expect(p.parse("1Ps 1").osis()).toEqual("");
      return expect(p.parse("11Sam 1").osis()).toEqual("");
    });
  });

  describe("Localized book Gen (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gen (mk)", function() {
      
		expect(p.parse("Прва книга Мојсеева 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Прва книга Мојсеева 1:1'")
		expect(p.parse("Прво книга Мојсеева 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Прво книга Мојсеева 1:1'")
		expect(p.parse("1.. книга Мојсеева 1:1").osis()).toEqual("Gen.1.1", "parsing: '1.. книга Мојсеева 1:1'")
		expect(p.parse("1. книга Мојсеева 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. книга Мојсеева 1:1'")
		expect(p.parse("I. книга Мојсеева 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. книга Мојсеева 1:1'")
		expect(p.parse("1 книга Мојсеева 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 книга Мојсеева 1:1'")
		expect(p.parse("I книга Мојсеева 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I книга Мојсеева 1:1'")
		expect(p.parse("Настанување 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Настанување 1:1'")
		expect(p.parse("Битие 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Битие 1:1'")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Gen 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: 'ПРВА КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("ПРВО КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: 'ПРВО КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("1.. КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: '1.. КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("1. КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("I. КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("1 КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("I КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("НАСТАНУВАЊЕ 1:1").osis()).toEqual("Gen.1.1", "parsing: 'НАСТАНУВАЊЕ 1:1'")
		expect(p.parse("БИТИЕ 1:1").osis()).toEqual("Gen.1.1", "parsing: 'БИТИЕ 1:1'")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1", "parsing: 'GEN 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Exod (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Exod (mk)", function() {
      
		expect(p.parse("Втора книга Мојсеева 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Втора книга Мојсеева 1:1'")
		expect(p.parse("Второ книга Мојсеева 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Второ книга Мојсеева 1:1'")
		expect(p.parse("2.. книга Мојсеева 1:1").osis()).toEqual("Exod.1.1", "parsing: '2.. книга Мојсеева 1:1'")
		expect(p.parse("II. книга Мојсеева 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. книга Мојсеева 1:1'")
		expect(p.parse("2. книга Мојсеева 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. книга Мојсеева 1:1'")
		expect(p.parse("II книга Мојсеева 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II книга Мојсеева 1:1'")
		expect(p.parse("2 книга Мојсеева 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 книга Мојсеева 1:1'")
		expect(p.parse("Излез 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Излез 1:1'")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Exod 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ВТОРА КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: 'ВТОРА КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("ВТОРО КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: 'ВТОРО КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("2.. КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: '2.. КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("II. КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("2. КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("II КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("2 КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("ИЗЛЕЗ 1:1").osis()).toEqual("Exod.1.1", "parsing: 'ИЗЛЕЗ 1:1'")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1", "parsing: 'EXOD 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Bel (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bel (mk)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1", "parsing: 'Bel 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Lev (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lev (mk)", function() {
      
		expect(p.parse("Трета книга Мојсеева 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Трета книга Мојсеева 1:1'")
		expect(p.parse("Левитска книга 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Левитска книга 1:1'")
		expect(p.parse("Левитска 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Левитска 1:1'")
		expect(p.parse("Левит 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Левит 1:1'")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Lev 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ТРЕТА КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Lev.1.1", "parsing: 'ТРЕТА КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("ЛЕВИТСКА КНИГА 1:1").osis()).toEqual("Lev.1.1", "parsing: 'ЛЕВИТСКА КНИГА 1:1'")
		expect(p.parse("ЛЕВИТСКА 1:1").osis()).toEqual("Lev.1.1", "parsing: 'ЛЕВИТСКА 1:1'")
		expect(p.parse("ЛЕВИТ 1:1").osis()).toEqual("Lev.1.1", "parsing: 'ЛЕВИТ 1:1'")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1", "parsing: 'LEV 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Num (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Num (mk)", function() {
      
		expect(p.parse("Четврта книга Мојсеева 1:1").osis()).toEqual("Num.1.1", "parsing: 'Четврта книга Мојсеева 1:1'")
		expect(p.parse("Броеви 1:1").osis()).toEqual("Num.1.1", "parsing: 'Броеви 1:1'")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1", "parsing: 'Num 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЧЕТВРТА КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Num.1.1", "parsing: 'ЧЕТВРТА КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("БРОЕВИ 1:1").osis()).toEqual("Num.1.1", "parsing: 'БРОЕВИ 1:1'")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1", "parsing: 'NUM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Sir (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sir (mk)", function() {
      
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Sir 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Wis (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Wis (mk)", function() {
      
		expect(p.parse("Книга Мудрост Соломонова 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Книга Мудрост Соломонова 1:1'")
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Wis 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Lam (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lam (mk)", function() {
      
		expect(p.parse("Плачот на Еремија 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Плачот на Еремија 1:1'")
		expect(p.parse("Плач на Еремиин 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Плач на Еремиин 1:1'")
		expect(p.parse("Плач Еремиин 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Плач Еремиин 1:1'")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Lam 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПЛАЧОТ НА ЕРЕМИЈА 1:1").osis()).toEqual("Lam.1.1", "parsing: 'ПЛАЧОТ НА ЕРЕМИЈА 1:1'")
		expect(p.parse("ПЛАЧ НА ЕРЕМИИН 1:1").osis()).toEqual("Lam.1.1", "parsing: 'ПЛАЧ НА ЕРЕМИИН 1:1'")
		expect(p.parse("ПЛАЧ ЕРЕМИИН 1:1").osis()).toEqual("Lam.1.1", "parsing: 'ПЛАЧ ЕРЕМИИН 1:1'")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1", "parsing: 'LAM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book EpJer (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: EpJer (mk)", function() {
      
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'EpJer 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Rev (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rev (mk)", function() {
      
		expect(p.parse("Откровение 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Откровение 1:1'")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Rev 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ОТКРОВЕНИЕ 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ОТКРОВЕНИЕ 1:1'")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1", "parsing: 'REV 1:1'")
		;
      return true;
    });
  });

  describe("Localized book PrMan (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrMan (mk)", function() {
      
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1", "parsing: 'PrMan 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Deut (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Deut (mk)", function() {
      
		expect(p.parse("Петта книга Мојсеева 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Петта книга Мојсеева 1:1'")
		expect(p.parse("Повторени закони 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Повторени закони 1:1'")
		expect(p.parse("Второзаконие 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Второзаконие 1:1'")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Deut 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПЕТТА КНИГА МОЈСЕЕВА 1:1").osis()).toEqual("Deut.1.1", "parsing: 'ПЕТТА КНИГА МОЈСЕЕВА 1:1'")
		expect(p.parse("ПОВТОРЕНИ ЗАКОНИ 1:1").osis()).toEqual("Deut.1.1", "parsing: 'ПОВТОРЕНИ ЗАКОНИ 1:1'")
		expect(p.parse("ВТОРОЗАКОНИЕ 1:1").osis()).toEqual("Deut.1.1", "parsing: 'ВТОРОЗАКОНИЕ 1:1'")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1", "parsing: 'DEUT 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Josh (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Josh (mk)", function() {
      
		expect(p.parse("Книга на Исус Невин 1:1").osis()).toEqual("Josh.1.1", "parsing: 'Книга на Исус Невин 1:1'")
		expect(p.parse("Исус Навин 1:1").osis()).toEqual("Josh.1.1", "parsing: 'Исус Навин 1:1'")
		expect(p.parse("Јешуа 1:1").osis()).toEqual("Josh.1.1", "parsing: 'Јешуа 1:1'")
		expect(p.parse("Јошуа 1:1").osis()).toEqual("Josh.1.1", "parsing: 'Јошуа 1:1'")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1", "parsing: 'Josh 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("КНИГА НА ИСУС НЕВИН 1:1").osis()).toEqual("Josh.1.1", "parsing: 'КНИГА НА ИСУС НЕВИН 1:1'")
		expect(p.parse("ИСУС НАВИН 1:1").osis()).toEqual("Josh.1.1", "parsing: 'ИСУС НАВИН 1:1'")
		expect(p.parse("ЈЕШУА 1:1").osis()).toEqual("Josh.1.1", "parsing: 'ЈЕШУА 1:1'")
		expect(p.parse("ЈОШУА 1:1").osis()).toEqual("Josh.1.1", "parsing: 'ЈОШУА 1:1'")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1", "parsing: 'JOSH 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Judg (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Judg (mk)", function() {
      
		expect(p.parse("Книга на израелеви судии 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Книга на израелеви судии 1:1'")
		expect(p.parse("Судии 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Судии 1:1'")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Judg 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("КНИГА НА ИЗРАЕЛЕВИ СУДИИ 1:1").osis()).toEqual("Judg.1.1", "parsing: 'КНИГА НА ИЗРАЕЛЕВИ СУДИИ 1:1'")
		expect(p.parse("СУДИИ 1:1").osis()).toEqual("Judg.1.1", "parsing: 'СУДИИ 1:1'")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1", "parsing: 'JUDG 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ruth (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ruth (mk)", function() {
      
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'Ruth 1:1'")
		expect(p.parse("Рут 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'Рут 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'RUTH 1:1'")
		expect(p.parse("РУТ 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'РУТ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Esd (mk)", function() {
      
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1Esd 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Esd (mk)", function() {
      
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2Esd 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Isa (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Isa (mk)", function() {
      
		expect(p.parse("Исаија 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Исаија 1:1'")
		expect(p.parse("Исаја 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Исаја 1:1'")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Isa 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ИСАИЈА 1:1").osis()).toEqual("Isa.1.1", "parsing: 'ИСАИЈА 1:1'")
		expect(p.parse("ИСАЈА 1:1").osis()).toEqual("Isa.1.1", "parsing: 'ИСАЈА 1:1'")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1", "parsing: 'ISA 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Sam (mk)", function() {
      
		expect(p.parse("Втора книга Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Втора книга Самоилова 1:1'")
		expect(p.parse("Второ книга Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Второ книга Самоилова 1:1'")
		expect(p.parse("2.. книга Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2.. книга Самоилова 1:1'")
		expect(p.parse("II. книга Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. книга Самоилова 1:1'")
		expect(p.parse("2. книга Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. книга Самоилова 1:1'")
		expect(p.parse("II книга Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II книга Самоилова 1:1'")
		expect(p.parse("2 книга Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 книга Самоилова 1:1'")
		expect(p.parse("Втора Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Втора Самоилова 1:1'")
		expect(p.parse("Второ Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Второ Самоилова 1:1'")
		expect(p.parse("2.. Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2.. Самоилова 1:1'")
		expect(p.parse("II. Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. Самоилова 1:1'")
		expect(p.parse("2. Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. Самоилова 1:1'")
		expect(p.parse("II Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II Самоилова 1:1'")
		expect(p.parse("Втора Самуил 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Втора Самуил 1:1'")
		expect(p.parse("Второ Самуил 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Второ Самуил 1:1'")
		expect(p.parse("2 Самоилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 Самоилова 1:1'")
		expect(p.parse("2.. Самуил 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2.. Самуил 1:1'")
		expect(p.parse("II. Самуил 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. Самуил 1:1'")
		expect(p.parse("2. Самуил 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. Самуил 1:1'")
		expect(p.parse("II Самуил 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II Самуил 1:1'")
		expect(p.parse("2 Самуил 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 Самуил 1:1'")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2Sam 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ВТОРА КНИГА САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'ВТОРА КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("ВТОРО КНИГА САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'ВТОРО КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("2.. КНИГА САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2.. КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("II. КНИГА САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("2. КНИГА САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("II КНИГА САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("2 КНИГА САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("ВТОРА САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'ВТОРА САМОИЛОВА 1:1'")
		expect(p.parse("ВТОРО САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'ВТОРО САМОИЛОВА 1:1'")
		expect(p.parse("2.. САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2.. САМОИЛОВА 1:1'")
		expect(p.parse("II. САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. САМОИЛОВА 1:1'")
		expect(p.parse("2. САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. САМОИЛОВА 1:1'")
		expect(p.parse("II САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II САМОИЛОВА 1:1'")
		expect(p.parse("ВТОРА САМУИЛ 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'ВТОРА САМУИЛ 1:1'")
		expect(p.parse("ВТОРО САМУИЛ 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'ВТОРО САМУИЛ 1:1'")
		expect(p.parse("2 САМОИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 САМОИЛОВА 1:1'")
		expect(p.parse("2.. САМУИЛ 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2.. САМУИЛ 1:1'")
		expect(p.parse("II. САМУИЛ 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. САМУИЛ 1:1'")
		expect(p.parse("2. САМУИЛ 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. САМУИЛ 1:1'")
		expect(p.parse("II САМУИЛ 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II САМУИЛ 1:1'")
		expect(p.parse("2 САМУИЛ 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 САМУИЛ 1:1'")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2SAM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Sam (mk)", function() {
      
		expect(p.parse("Прва книга Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Прва книга Самоилова 1:1'")
		expect(p.parse("Прво книга Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Прво книга Самоилова 1:1'")
		expect(p.parse("1.. книга Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1.. книга Самоилова 1:1'")
		expect(p.parse("1. книга Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. книга Самоилова 1:1'")
		expect(p.parse("I. книга Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. книга Самоилова 1:1'")
		expect(p.parse("1 книга Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 книга Самоилова 1:1'")
		expect(p.parse("I книга Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I книга Самоилова 1:1'")
		expect(p.parse("Прва Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Прва Самоилова 1:1'")
		expect(p.parse("Прво Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Прво Самоилова 1:1'")
		expect(p.parse("1.. Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1.. Самоилова 1:1'")
		expect(p.parse("1. Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. Самоилова 1:1'")
		expect(p.parse("I. Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. Самоилова 1:1'")
		expect(p.parse("1 Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 Самоилова 1:1'")
		expect(p.parse("I Самоилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I Самоилова 1:1'")
		expect(p.parse("Прва Самуил 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Прва Самуил 1:1'")
		expect(p.parse("Прво Самуил 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Прво Самуил 1:1'")
		expect(p.parse("1.. Самуил 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1.. Самуил 1:1'")
		expect(p.parse("1. Самуил 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. Самуил 1:1'")
		expect(p.parse("I. Самуил 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. Самуил 1:1'")
		expect(p.parse("1 Самуил 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 Самуил 1:1'")
		expect(p.parse("I Самуил 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I Самуил 1:1'")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1Sam 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА КНИГА САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'ПРВА КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("ПРВО КНИГА САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'ПРВО КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("1.. КНИГА САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1.. КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("1. КНИГА САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("I. КНИГА САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("1 КНИГА САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("I КНИГА САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I КНИГА САМОИЛОВА 1:1'")
		expect(p.parse("ПРВА САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'ПРВА САМОИЛОВА 1:1'")
		expect(p.parse("ПРВО САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'ПРВО САМОИЛОВА 1:1'")
		expect(p.parse("1.. САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1.. САМОИЛОВА 1:1'")
		expect(p.parse("1. САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. САМОИЛОВА 1:1'")
		expect(p.parse("I. САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. САМОИЛОВА 1:1'")
		expect(p.parse("1 САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 САМОИЛОВА 1:1'")
		expect(p.parse("I САМОИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I САМОИЛОВА 1:1'")
		expect(p.parse("ПРВА САМУИЛ 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'ПРВА САМУИЛ 1:1'")
		expect(p.parse("ПРВО САМУИЛ 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'ПРВО САМУИЛ 1:1'")
		expect(p.parse("1.. САМУИЛ 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1.. САМУИЛ 1:1'")
		expect(p.parse("1. САМУИЛ 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. САМУИЛ 1:1'")
		expect(p.parse("I. САМУИЛ 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. САМУИЛ 1:1'")
		expect(p.parse("1 САМУИЛ 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 САМУИЛ 1:1'")
		expect(p.parse("I САМУИЛ 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I САМУИЛ 1:1'")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1SAM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Kgs (mk)", function() {
      
		expect(p.parse("Втора книга за царевите 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Втора книга за царевите 1:1'")
		expect(p.parse("Второ книга за царевите 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Второ книга за царевите 1:1'")
		expect(p.parse("2.. книга за царевите 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2.. книга за царевите 1:1'")
		expect(p.parse("II. книга за царевите 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. книга за царевите 1:1'")
		expect(p.parse("2. книга за царевите 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. книга за царевите 1:1'")
		expect(p.parse("II книга за царевите 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II книга за царевите 1:1'")
		expect(p.parse("2 книга за царевите 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 книга за царевите 1:1'")
		expect(p.parse("Втора Цареви 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Втора Цареви 1:1'")
		expect(p.parse("Второ Цареви 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Второ Цареви 1:1'")
		expect(p.parse("2.. Цареви 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2.. Цареви 1:1'")
		expect(p.parse("II. Цареви 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. Цареви 1:1'")
		expect(p.parse("2. Цареви 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. Цареви 1:1'")
		expect(p.parse("II Цареви 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II Цареви 1:1'")
		expect(p.parse("2 Цареви 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 Цареви 1:1'")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2Kgs 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ВТОРА КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'ВТОРА КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("ВТОРО КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'ВТОРО КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("2.. КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2.. КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("II. КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("2. КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("II КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("2 КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("ВТОРА ЦАРЕВИ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'ВТОРА ЦАРЕВИ 1:1'")
		expect(p.parse("ВТОРО ЦАРЕВИ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'ВТОРО ЦАРЕВИ 1:1'")
		expect(p.parse("2.. ЦАРЕВИ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2.. ЦАРЕВИ 1:1'")
		expect(p.parse("II. ЦАРЕВИ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. ЦАРЕВИ 1:1'")
		expect(p.parse("2. ЦАРЕВИ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. ЦАРЕВИ 1:1'")
		expect(p.parse("II ЦАРЕВИ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II ЦАРЕВИ 1:1'")
		expect(p.parse("2 ЦАРЕВИ 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 ЦАРЕВИ 1:1'")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2KGS 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Kgs (mk)", function() {
      
		expect(p.parse("Прва книга за царевите 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Прва книга за царевите 1:1'")
		expect(p.parse("Прво книга за царевите 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Прво книга за царевите 1:1'")
		expect(p.parse("1.. книга за царевите 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1.. книга за царевите 1:1'")
		expect(p.parse("1. книга за царевите 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. книга за царевите 1:1'")
		expect(p.parse("I. книга за царевите 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. книга за царевите 1:1'")
		expect(p.parse("1 книга за царевите 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 книга за царевите 1:1'")
		expect(p.parse("I книга за царевите 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I книга за царевите 1:1'")
		expect(p.parse("Прва Цареви 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Прва Цареви 1:1'")
		expect(p.parse("Прво Цареви 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Прво Цареви 1:1'")
		expect(p.parse("1.. Цареви 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1.. Цареви 1:1'")
		expect(p.parse("1. Цареви 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. Цареви 1:1'")
		expect(p.parse("I. Цареви 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. Цареви 1:1'")
		expect(p.parse("1 Цареви 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 Цареви 1:1'")
		expect(p.parse("I Цареви 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I Цареви 1:1'")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1Kgs 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'ПРВА КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("ПРВО КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'ПРВО КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("1.. КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1.. КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("1. КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("I. КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("1 КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("I КНИГА ЗА ЦАРЕВИТЕ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I КНИГА ЗА ЦАРЕВИТЕ 1:1'")
		expect(p.parse("ПРВА ЦАРЕВИ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'ПРВА ЦАРЕВИ 1:1'")
		expect(p.parse("ПРВО ЦАРЕВИ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'ПРВО ЦАРЕВИ 1:1'")
		expect(p.parse("1.. ЦАРЕВИ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1.. ЦАРЕВИ 1:1'")
		expect(p.parse("1. ЦАРЕВИ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. ЦАРЕВИ 1:1'")
		expect(p.parse("I. ЦАРЕВИ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. ЦАРЕВИ 1:1'")
		expect(p.parse("1 ЦАРЕВИ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 ЦАРЕВИ 1:1'")
		expect(p.parse("I ЦАРЕВИ 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I ЦАРЕВИ 1:1'")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1KGS 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Chr (mk)", function() {
      
		expect(p.parse("Втора книга летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Втора книга летописи 1:1'")
		expect(p.parse("Второ книга летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Второ книга летописи 1:1'")
		expect(p.parse("2.. книга летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2.. книга летописи 1:1'")
		expect(p.parse("II. книга летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. книга летописи 1:1'")
		expect(p.parse("2. книга летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. книга летописи 1:1'")
		expect(p.parse("II книга летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II книга летописи 1:1'")
		expect(p.parse("2 книга летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 книга летописи 1:1'")
		expect(p.parse("Втора Летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Втора Летописи 1:1'")
		expect(p.parse("Второ Летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Второ Летописи 1:1'")
		expect(p.parse("2.. Летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2.. Летописи 1:1'")
		expect(p.parse("II. Летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. Летописи 1:1'")
		expect(p.parse("2. Летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. Летописи 1:1'")
		expect(p.parse("II Летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II Летописи 1:1'")
		expect(p.parse("2 Летописи 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 Летописи 1:1'")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2Chr 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ВТОРА КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'ВТОРА КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("ВТОРО КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'ВТОРО КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("2.. КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2.. КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("II. КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("2. КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("II КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("2 КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("ВТОРА ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'ВТОРА ЛЕТОПИСИ 1:1'")
		expect(p.parse("ВТОРО ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'ВТОРО ЛЕТОПИСИ 1:1'")
		expect(p.parse("2.. ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2.. ЛЕТОПИСИ 1:1'")
		expect(p.parse("II. ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. ЛЕТОПИСИ 1:1'")
		expect(p.parse("2. ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. ЛЕТОПИСИ 1:1'")
		expect(p.parse("II ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II ЛЕТОПИСИ 1:1'")
		expect(p.parse("2 ЛЕТОПИСИ 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 ЛЕТОПИСИ 1:1'")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2CHR 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Chr (mk)", function() {
      
		expect(p.parse("Прва книга летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Прва книга летописи 1:1'")
		expect(p.parse("Прво книга летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Прво книга летописи 1:1'")
		expect(p.parse("1.. книга летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1.. книга летописи 1:1'")
		expect(p.parse("1. книга летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. книга летописи 1:1'")
		expect(p.parse("I. книга летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. книга летописи 1:1'")
		expect(p.parse("1 книга летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 книга летописи 1:1'")
		expect(p.parse("I книга летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I книга летописи 1:1'")
		expect(p.parse("Прва Летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Прва Летописи 1:1'")
		expect(p.parse("Прво Летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Прво Летописи 1:1'")
		expect(p.parse("1.. Летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1.. Летописи 1:1'")
		expect(p.parse("1. Летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. Летописи 1:1'")
		expect(p.parse("I. Летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. Летописи 1:1'")
		expect(p.parse("1 Летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 Летописи 1:1'")
		expect(p.parse("I Летописи 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I Летописи 1:1'")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1Chr 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'ПРВА КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("ПРВО КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'ПРВО КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("1.. КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1.. КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("1. КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("I. КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("1 КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("I КНИГА ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I КНИГА ЛЕТОПИСИ 1:1'")
		expect(p.parse("ПРВА ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'ПРВА ЛЕТОПИСИ 1:1'")
		expect(p.parse("ПРВО ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'ПРВО ЛЕТОПИСИ 1:1'")
		expect(p.parse("1.. ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1.. ЛЕТОПИСИ 1:1'")
		expect(p.parse("1. ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. ЛЕТОПИСИ 1:1'")
		expect(p.parse("I. ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. ЛЕТОПИСИ 1:1'")
		expect(p.parse("1 ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 ЛЕТОПИСИ 1:1'")
		expect(p.parse("I ЛЕТОПИСИ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I ЛЕТОПИСИ 1:1'")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1CHR 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ezra (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezra (mk)", function() {
      
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Ezra 1:1'")
		expect(p.parse("Езра 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Езра 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'EZRA 1:1'")
		expect(p.parse("ЕЗРА 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'ЕЗРА 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Neh (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Neh (mk)", function() {
      
		expect(p.parse("Нехемија 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Нехемија 1:1'")
		expect(p.parse("Неемија 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Неемија 1:1'")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Neh 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("НЕХЕМИЈА 1:1").osis()).toEqual("Neh.1.1", "parsing: 'НЕХЕМИЈА 1:1'")
		expect(p.parse("НЕЕМИЈА 1:1").osis()).toEqual("Neh.1.1", "parsing: 'НЕЕМИЈА 1:1'")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1", "parsing: 'NEH 1:1'")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: GkEsth (mk)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'GkEsth 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Esth (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Esth (mk)", function() {
      
		expect(p.parse("Естира 1:1").osis()).toEqual("Esth.1.1", "parsing: 'Естира 1:1'")
		expect(p.parse("Естер 1:1").osis()).toEqual("Esth.1.1", "parsing: 'Естер 1:1'")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1", "parsing: 'Esth 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЕСТИРА 1:1").osis()).toEqual("Esth.1.1", "parsing: 'ЕСТИРА 1:1'")
		expect(p.parse("ЕСТЕР 1:1").osis()).toEqual("Esth.1.1", "parsing: 'ЕСТЕР 1:1'")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1", "parsing: 'ESTH 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Job (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Job (mk)", function() {
      
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1", "parsing: 'Job 1:1'")
		expect(p.parse("Јов 1:1").osis()).toEqual("Job.1.1", "parsing: 'Јов 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1", "parsing: 'JOB 1:1'")
		expect(p.parse("ЈОВ 1:1").osis()).toEqual("Job.1.1", "parsing: 'ЈОВ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ps (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ps (mk)", function() {
      
		expect(p.parse("Псалми 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Псалми 1:1'")
		expect(p.parse("Псалм 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Псалм 1:1'")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Ps 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПСАЛМИ 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ПСАЛМИ 1:1'")
		expect(p.parse("ПСАЛМ 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ПСАЛМ 1:1'")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1", "parsing: 'PS 1:1'")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrAzar (mk)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1", "parsing: 'PrAzar 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Prov (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Prov (mk)", function() {
      
		expect(p.parse("Пословици 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Пословици 1:1'")
		expect(p.parse("Изреки 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Изреки 1:1'")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prov 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛОВИЦИ 1:1").osis()).toEqual("Prov.1.1", "parsing: 'ПОСЛОВИЦИ 1:1'")
		expect(p.parse("ИЗРЕКИ 1:1").osis()).toEqual("Prov.1.1", "parsing: 'ИЗРЕКИ 1:1'")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PROV 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Eccl (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eccl (mk)", function() {
      
		expect(p.parse("Проповедник 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'Проповедник 1:1'")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'Eccl 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРОПОВЕДНИК 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'ПРОПОВЕДНИК 1:1'")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'ECCL 1:1'")
		;
      return true;
    });
  });

  describe("Localized book SgThree (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: SgThree (mk)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'SgThree 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Song (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Song (mk)", function() {
      
		expect(p.parse("Песната над песните 1:1").osis()).toEqual("Song.1.1", "parsing: 'Песната над песните 1:1'")
		expect(p.parse("Песната на Соломон 1:1").osis()).toEqual("Song.1.1", "parsing: 'Песната на Соломон 1:1'")
		expect(p.parse("Песна над песните 1:1").osis()).toEqual("Song.1.1", "parsing: 'Песна над песните 1:1'")
		expect(p.parse("Црковни химни 1:1").osis()).toEqual("Song.1.1", "parsing: 'Црковни химни 1:1'")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1", "parsing: 'Song 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПЕСНАТА НАД ПЕСНИТЕ 1:1").osis()).toEqual("Song.1.1", "parsing: 'ПЕСНАТА НАД ПЕСНИТЕ 1:1'")
		expect(p.parse("ПЕСНАТА НА СОЛОМОН 1:1").osis()).toEqual("Song.1.1", "parsing: 'ПЕСНАТА НА СОЛОМОН 1:1'")
		expect(p.parse("ПЕСНА НАД ПЕСНИТЕ 1:1").osis()).toEqual("Song.1.1", "parsing: 'ПЕСНА НАД ПЕСНИТЕ 1:1'")
		expect(p.parse("ЦРКОВНИ ХИМНИ 1:1").osis()).toEqual("Song.1.1", "parsing: 'ЦРКОВНИ ХИМНИ 1:1'")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1", "parsing: 'SONG 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jer (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jer (mk)", function() {
      
		expect(p.parse("Еремија 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Еремија 1:1'")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jer 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЕРЕМИЈА 1:1").osis()).toEqual("Jer.1.1", "parsing: 'ЕРЕМИЈА 1:1'")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JER 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ezek (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezek (mk)", function() {
      
		expect(p.parse("Езекиел 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'Езекиел 1:1'")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'Ezek 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЕЗЕКИЕЛ 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'ЕЗЕКИЕЛ 1:1'")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'EZEK 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Dan (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Dan (mk)", function() {
      
		expect(p.parse("Даниел 1:1").osis()).toEqual("Dan.1.1", "parsing: 'Даниел 1:1'")
		expect(p.parse("Данил 1:1").osis()).toEqual("Dan.1.1", "parsing: 'Данил 1:1'")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1", "parsing: 'Dan 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДАНИЕЛ 1:1").osis()).toEqual("Dan.1.1", "parsing: 'ДАНИЕЛ 1:1'")
		expect(p.parse("ДАНИЛ 1:1").osis()).toEqual("Dan.1.1", "parsing: 'ДАНИЛ 1:1'")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1", "parsing: 'DAN 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Hos (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hos (mk)", function() {
      
		expect(p.parse("Осија 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Осија 1:1'")
		expect(p.parse("Хошеа 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Хошеа 1:1'")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Hos 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ОСИЈА 1:1").osis()).toEqual("Hos.1.1", "parsing: 'ОСИЈА 1:1'")
		expect(p.parse("ХОШЕА 1:1").osis()).toEqual("Hos.1.1", "parsing: 'ХОШЕА 1:1'")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1", "parsing: 'HOS 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Joel (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Joel (mk)", function() {
      
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1", "parsing: 'Joel 1:1'")
		expect(p.parse("Јоел 1:1").osis()).toEqual("Joel.1.1", "parsing: 'Јоел 1:1'")
		expect(p.parse("Јоил 1:1").osis()).toEqual("Joel.1.1", "parsing: 'Јоил 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1", "parsing: 'JOEL 1:1'")
		expect(p.parse("ЈОЕЛ 1:1").osis()).toEqual("Joel.1.1", "parsing: 'ЈОЕЛ 1:1'")
		expect(p.parse("ЈОИЛ 1:1").osis()).toEqual("Joel.1.1", "parsing: 'ЈОИЛ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Amos (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Amos (mk)", function() {
      
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1", "parsing: 'Amos 1:1'")
		expect(p.parse("Амос 1:1").osis()).toEqual("Amos.1.1", "parsing: 'Амос 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1", "parsing: 'AMOS 1:1'")
		expect(p.parse("АМОС 1:1").osis()).toEqual("Amos.1.1", "parsing: 'АМОС 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Obad (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Obad (mk)", function() {
      
		expect(p.parse("Овадија 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Овадија 1:1'")
		expect(p.parse("Авдиј 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Авдиј 1:1'")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Obad 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ОВАДИЈА 1:1").osis()).toEqual("Obad.1.1", "parsing: 'ОВАДИЈА 1:1'")
		expect(p.parse("АВДИЈ 1:1").osis()).toEqual("Obad.1.1", "parsing: 'АВДИЈ 1:1'")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1", "parsing: 'OBAD 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jonah (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jonah (mk)", function() {
      
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'Jonah 1:1'")
		expect(p.parse("Јона 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'Јона 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'JONAH 1:1'")
		expect(p.parse("ЈОНА 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'ЈОНА 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Mic (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mic (mk)", function() {
      
		expect(p.parse("Михеј 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Михеј 1:1'")
		expect(p.parse("Миха 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Миха 1:1'")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Mic 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("МИХЕЈ 1:1").osis()).toEqual("Mic.1.1", "parsing: 'МИХЕЈ 1:1'")
		expect(p.parse("МИХА 1:1").osis()).toEqual("Mic.1.1", "parsing: 'МИХА 1:1'")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MIC 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Nah (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Nah (mk)", function() {
      
		expect(p.parse("Наум 1:1").osis()).toEqual("Nah.1.1", "parsing: 'Наум 1:1'")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1", "parsing: 'Nah 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("НАУМ 1:1").osis()).toEqual("Nah.1.1", "parsing: 'НАУМ 1:1'")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1", "parsing: 'NAH 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Hab (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hab (mk)", function() {
      
		expect(p.parse("Хабакук 1:1").osis()).toEqual("Hab.1.1", "parsing: 'Хабакук 1:1'")
		expect(p.parse("Хавакук 1:1").osis()).toEqual("Hab.1.1", "parsing: 'Хавакук 1:1'")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1", "parsing: 'Hab 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ХАБАКУК 1:1").osis()).toEqual("Hab.1.1", "parsing: 'ХАБАКУК 1:1'")
		expect(p.parse("ХАВАКУК 1:1").osis()).toEqual("Hab.1.1", "parsing: 'ХАВАКУК 1:1'")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1", "parsing: 'HAB 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Zeph (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zeph (mk)", function() {
      
		expect(p.parse("Сефанија 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Сефанија 1:1'")
		expect(p.parse("Софонија 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Софонија 1:1'")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Zeph 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("СЕФАНИЈА 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'СЕФАНИЈА 1:1'")
		expect(p.parse("СОФОНИЈА 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'СОФОНИЈА 1:1'")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'ZEPH 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Hag (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hag (mk)", function() {
      
		expect(p.parse("Хагај 1:1").osis()).toEqual("Hag.1.1", "parsing: 'Хагај 1:1'")
		expect(p.parse("Агеј 1:1").osis()).toEqual("Hag.1.1", "parsing: 'Агеј 1:1'")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1", "parsing: 'Hag 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ХАГАЈ 1:1").osis()).toEqual("Hag.1.1", "parsing: 'ХАГАЈ 1:1'")
		expect(p.parse("АГЕЈ 1:1").osis()).toEqual("Hag.1.1", "parsing: 'АГЕЈ 1:1'")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1", "parsing: 'HAG 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Zech (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zech (mk)", function() {
      
		expect(p.parse("Захарија 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Захарија 1:1'")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zech 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЗАХАРИЈА 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ЗАХАРИЈА 1:1'")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZECH 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Mal (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mal (mk)", function() {
      
		expect(p.parse("Малахија 1:1").osis()).toEqual("Mal.1.1", "parsing: 'Малахија 1:1'")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1", "parsing: 'Mal 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("МАЛАХИЈА 1:1").osis()).toEqual("Mal.1.1", "parsing: 'МАЛАХИЈА 1:1'")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1", "parsing: 'MAL 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Matt (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Matt (mk)", function() {
      
		expect(p.parse("Евангелието според Матеј 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Евангелието според Матеј 1:1'")
		expect(p.parse("Евангелие според Матеј 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Евангелие според Матеј 1:1'")
		expect(p.parse("Матеј 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Матеј 1:1'")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Matt 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЕВАНГЕЛИЕТО СПОРЕД МАТЕЈ 1:1").osis()).toEqual("Matt.1.1", "parsing: 'ЕВАНГЕЛИЕТО СПОРЕД МАТЕЈ 1:1'")
		expect(p.parse("ЕВАНГЕЛИЕ СПОРЕД МАТЕЈ 1:1").osis()).toEqual("Matt.1.1", "parsing: 'ЕВАНГЕЛИЕ СПОРЕД МАТЕЈ 1:1'")
		expect(p.parse("МАТЕЈ 1:1").osis()).toEqual("Matt.1.1", "parsing: 'МАТЕЈ 1:1'")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1", "parsing: 'MATT 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Mark (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mark (mk)", function() {
      
		expect(p.parse("Евангелието според Марко 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Евангелието според Марко 1:1'")
		expect(p.parse("Евангелие според Марко 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Евангелие според Марко 1:1'")
		expect(p.parse("Марко 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Марко 1:1'")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Mark 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЕВАНГЕЛИЕТО СПОРЕД МАРКО 1:1").osis()).toEqual("Mark.1.1", "parsing: 'ЕВАНГЕЛИЕТО СПОРЕД МАРКО 1:1'")
		expect(p.parse("ЕВАНГЕЛИЕ СПОРЕД МАРКО 1:1").osis()).toEqual("Mark.1.1", "parsing: 'ЕВАНГЕЛИЕ СПОРЕД МАРКО 1:1'")
		expect(p.parse("МАРКО 1:1").osis()).toEqual("Mark.1.1", "parsing: 'МАРКО 1:1'")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1", "parsing: 'MARK 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Luke (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Luke (mk)", function() {
      
		expect(p.parse("Евангелието според Лука 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Евангелието според Лука 1:1'")
		expect(p.parse("Евангелие според Лука 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Евангелие според Лука 1:1'")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Luke 1:1'")
		expect(p.parse("Лука 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Лука 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЕВАНГЕЛИЕТО СПОРЕД ЛУКА 1:1").osis()).toEqual("Luke.1.1", "parsing: 'ЕВАНГЕЛИЕТО СПОРЕД ЛУКА 1:1'")
		expect(p.parse("ЕВАНГЕЛИЕ СПОРЕД ЛУКА 1:1").osis()).toEqual("Luke.1.1", "parsing: 'ЕВАНГЕЛИЕ СПОРЕД ЛУКА 1:1'")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LUKE 1:1'")
		expect(p.parse("ЛУКА 1:1").osis()).toEqual("Luke.1.1", "parsing: 'ЛУКА 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1John (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1John (mk)", function() {
      
		expect(p.parse("Прва послание на апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'Прва послание на апостол Јован 1:1'")
		expect(p.parse("Прво послание на апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'Прво послание на апостол Јован 1:1'")
		expect(p.parse("1.. послание на апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. послание на апостол Јован 1:1'")
		expect(p.parse("1. послание на апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: '1. послание на апостол Јован 1:1'")
		expect(p.parse("I. послание на апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. послание на апостол Јован 1:1'")
		expect(p.parse("1 послание на апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: '1 послание на апостол Јован 1:1'")
		expect(p.parse("I послание на апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'I послание на апостол Јован 1:1'")
		expect(p.parse("Прва писмо од апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'Прва писмо од апостол Јован 1:1'")
		expect(p.parse("Прво писмо од апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'Прво писмо од апостол Јован 1:1'")
		expect(p.parse("1.. писмо од апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. писмо од апостол Јован 1:1'")
		expect(p.parse("1. писмо од апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: '1. писмо од апостол Јован 1:1'")
		expect(p.parse("I. писмо од апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. писмо од апостол Јован 1:1'")
		expect(p.parse("1 писмо од апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: '1 писмо од апостол Јован 1:1'")
		expect(p.parse("I писмо од апостол Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'I писмо од апостол Јован 1:1'")
		expect(p.parse("Прва Јованово 1:1").osis()).toEqual("1John.1.1", "parsing: 'Прва Јованово 1:1'")
		expect(p.parse("Прво Јованово 1:1").osis()).toEqual("1John.1.1", "parsing: 'Прво Јованово 1:1'")
		expect(p.parse("1.. Јованово 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. Јованово 1:1'")
		expect(p.parse("1. Јованово 1:1").osis()).toEqual("1John.1.1", "parsing: '1. Јованово 1:1'")
		expect(p.parse("I. Јованово 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. Јованово 1:1'")
		expect(p.parse("1 Јованово 1:1").osis()).toEqual("1John.1.1", "parsing: '1 Јованово 1:1'")
		expect(p.parse("I Јованово 1:1").osis()).toEqual("1John.1.1", "parsing: 'I Јованово 1:1'")
		expect(p.parse("Прва Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'Прва Јован 1:1'")
		expect(p.parse("Прво Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'Прво Јован 1:1'")
		expect(p.parse("1.. Јован 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. Јован 1:1'")
		expect(p.parse("1. Јован 1:1").osis()).toEqual("1John.1.1", "parsing: '1. Јован 1:1'")
		expect(p.parse("I. Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. Јован 1:1'")
		expect(p.parse("1 Јован 1:1").osis()).toEqual("1John.1.1", "parsing: '1 Јован 1:1'")
		expect(p.parse("I Јован 1:1").osis()).toEqual("1John.1.1", "parsing: 'I Јован 1:1'")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1", "parsing: '1John 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'ПРВА ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ПРВО ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'ПРВО ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("1.. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("1. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: '1. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("I. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("1 ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: '1 ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("I ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'I ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ПРВА ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'ПРВА ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ПРВО ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'ПРВО ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("1.. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("1. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: '1. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("I. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("1 ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: '1 ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("I ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'I ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ПРВА ЈОВАНОВО 1:1").osis()).toEqual("1John.1.1", "parsing: 'ПРВА ЈОВАНОВО 1:1'")
		expect(p.parse("ПРВО ЈОВАНОВО 1:1").osis()).toEqual("1John.1.1", "parsing: 'ПРВО ЈОВАНОВО 1:1'")
		expect(p.parse("1.. ЈОВАНОВО 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. ЈОВАНОВО 1:1'")
		expect(p.parse("1. ЈОВАНОВО 1:1").osis()).toEqual("1John.1.1", "parsing: '1. ЈОВАНОВО 1:1'")
		expect(p.parse("I. ЈОВАНОВО 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. ЈОВАНОВО 1:1'")
		expect(p.parse("1 ЈОВАНОВО 1:1").osis()).toEqual("1John.1.1", "parsing: '1 ЈОВАНОВО 1:1'")
		expect(p.parse("I ЈОВАНОВО 1:1").osis()).toEqual("1John.1.1", "parsing: 'I ЈОВАНОВО 1:1'")
		expect(p.parse("ПРВА ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'ПРВА ЈОВАН 1:1'")
		expect(p.parse("ПРВО ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'ПРВО ЈОВАН 1:1'")
		expect(p.parse("1.. ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. ЈОВАН 1:1'")
		expect(p.parse("1. ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: '1. ЈОВАН 1:1'")
		expect(p.parse("I. ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. ЈОВАН 1:1'")
		expect(p.parse("1 ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: '1 ЈОВАН 1:1'")
		expect(p.parse("I ЈОВАН 1:1").osis()).toEqual("1John.1.1", "parsing: 'I ЈОВАН 1:1'")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1", "parsing: '1JOHN 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2John (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2John (mk)", function() {
      
		expect(p.parse("Втора послание на апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'Втора послание на апостол Јован 1:1'")
		expect(p.parse("Второ послание на апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'Второ послание на апостол Јован 1:1'")
		expect(p.parse("2.. послание на апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. послание на апостол Јован 1:1'")
		expect(p.parse("II. послание на апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. послание на апостол Јован 1:1'")
		expect(p.parse("2. послание на апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: '2. послание на апостол Јован 1:1'")
		expect(p.parse("II послание на апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'II послание на апостол Јован 1:1'")
		expect(p.parse("Втора писмо од апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'Втора писмо од апостол Јован 1:1'")
		expect(p.parse("Второ писмо од апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'Второ писмо од апостол Јован 1:1'")
		expect(p.parse("2 послание на апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: '2 послание на апостол Јован 1:1'")
		expect(p.parse("2.. писмо од апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. писмо од апостол Јован 1:1'")
		expect(p.parse("II. писмо од апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. писмо од апостол Јован 1:1'")
		expect(p.parse("2. писмо од апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: '2. писмо од апостол Јован 1:1'")
		expect(p.parse("II писмо од апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'II писмо од апостол Јован 1:1'")
		expect(p.parse("2 писмо од апостол Јован 1:1").osis()).toEqual("2John.1.1", "parsing: '2 писмо од апостол Јован 1:1'")
		expect(p.parse("Втора Јованово 1:1").osis()).toEqual("2John.1.1", "parsing: 'Втора Јованово 1:1'")
		expect(p.parse("Второ Јованово 1:1").osis()).toEqual("2John.1.1", "parsing: 'Второ Јованово 1:1'")
		expect(p.parse("2.. Јованово 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. Јованово 1:1'")
		expect(p.parse("II. Јованово 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. Јованово 1:1'")
		expect(p.parse("2. Јованово 1:1").osis()).toEqual("2John.1.1", "parsing: '2. Јованово 1:1'")
		expect(p.parse("II Јованово 1:1").osis()).toEqual("2John.1.1", "parsing: 'II Јованово 1:1'")
		expect(p.parse("Втора Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'Втора Јован 1:1'")
		expect(p.parse("Второ Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'Второ Јован 1:1'")
		expect(p.parse("2 Јованово 1:1").osis()).toEqual("2John.1.1", "parsing: '2 Јованово 1:1'")
		expect(p.parse("2.. Јован 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. Јован 1:1'")
		expect(p.parse("II. Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. Јован 1:1'")
		expect(p.parse("2. Јован 1:1").osis()).toEqual("2John.1.1", "parsing: '2. Јован 1:1'")
		expect(p.parse("II Јован 1:1").osis()).toEqual("2John.1.1", "parsing: 'II Јован 1:1'")
		expect(p.parse("2 Јован 1:1").osis()).toEqual("2John.1.1", "parsing: '2 Јован 1:1'")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1", "parsing: '2John 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ВТОРА ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'ВТОРА ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ВТОРО ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'ВТОРО ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("2.. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("II. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("2. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: '2. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("II ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'II ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ВТОРА ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'ВТОРА ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ВТОРО ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'ВТОРО ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("2 ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: '2 ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("2.. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("II. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("2. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: '2. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("II ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'II ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("2 ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: '2 ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ВТОРА ЈОВАНОВО 1:1").osis()).toEqual("2John.1.1", "parsing: 'ВТОРА ЈОВАНОВО 1:1'")
		expect(p.parse("ВТОРО ЈОВАНОВО 1:1").osis()).toEqual("2John.1.1", "parsing: 'ВТОРО ЈОВАНОВО 1:1'")
		expect(p.parse("2.. ЈОВАНОВО 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. ЈОВАНОВО 1:1'")
		expect(p.parse("II. ЈОВАНОВО 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. ЈОВАНОВО 1:1'")
		expect(p.parse("2. ЈОВАНОВО 1:1").osis()).toEqual("2John.1.1", "parsing: '2. ЈОВАНОВО 1:1'")
		expect(p.parse("II ЈОВАНОВО 1:1").osis()).toEqual("2John.1.1", "parsing: 'II ЈОВАНОВО 1:1'")
		expect(p.parse("ВТОРА ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'ВТОРА ЈОВАН 1:1'")
		expect(p.parse("ВТОРО ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'ВТОРО ЈОВАН 1:1'")
		expect(p.parse("2 ЈОВАНОВО 1:1").osis()).toEqual("2John.1.1", "parsing: '2 ЈОВАНОВО 1:1'")
		expect(p.parse("2.. ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. ЈОВАН 1:1'")
		expect(p.parse("II. ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. ЈОВАН 1:1'")
		expect(p.parse("2. ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: '2. ЈОВАН 1:1'")
		expect(p.parse("II ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: 'II ЈОВАН 1:1'")
		expect(p.parse("2 ЈОВАН 1:1").osis()).toEqual("2John.1.1", "parsing: '2 ЈОВАН 1:1'")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1", "parsing: '2JOHN 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 3John (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3John (mk)", function() {
      
		expect(p.parse("Трета послание на апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трета послание на апостол Јован 1:1'")
		expect(p.parse("Трето послание на апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трето послание на апостол Јован 1:1'")
		expect(p.parse("III. послание на апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. послание на апостол Јован 1:1'")
		expect(p.parse("3.. послание на апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. послание на апостол Јован 1:1'")
		expect(p.parse("III послание на апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'III послание на апостол Јован 1:1'")
		expect(p.parse("3. послание на апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: '3. послание на апостол Јован 1:1'")
		expect(p.parse("Трета писмо од апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трета писмо од апостол Јован 1:1'")
		expect(p.parse("Трето писмо од апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трето писмо од апостол Јован 1:1'")
		expect(p.parse("3 послание на апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: '3 послание на апостол Јован 1:1'")
		expect(p.parse("III. писмо од апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. писмо од апостол Јован 1:1'")
		expect(p.parse("3.. писмо од апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. писмо од апостол Јован 1:1'")
		expect(p.parse("III писмо од апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'III писмо од апостол Јован 1:1'")
		expect(p.parse("3. писмо од апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: '3. писмо од апостол Јован 1:1'")
		expect(p.parse("3 писмо од апостол Јован 1:1").osis()).toEqual("3John.1.1", "parsing: '3 писмо од апостол Јован 1:1'")
		expect(p.parse("Трета Јованово 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трета Јованово 1:1'")
		expect(p.parse("Трето Јованово 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трето Јованово 1:1'")
		expect(p.parse("III. Јованово 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. Јованово 1:1'")
		expect(p.parse("3.. Јованово 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. Јованово 1:1'")
		expect(p.parse("III Јованово 1:1").osis()).toEqual("3John.1.1", "parsing: 'III Јованово 1:1'")
		expect(p.parse("3. Јованово 1:1").osis()).toEqual("3John.1.1", "parsing: '3. Јованово 1:1'")
		expect(p.parse("Трета Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трета Јован 1:1'")
		expect(p.parse("Трето Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трето Јован 1:1'")
		expect(p.parse("3 Јованово 1:1").osis()).toEqual("3John.1.1", "parsing: '3 Јованово 1:1'")
		expect(p.parse("III. Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. Јован 1:1'")
		expect(p.parse("3.. Јован 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. Јован 1:1'")
		expect(p.parse("III Јован 1:1").osis()).toEqual("3John.1.1", "parsing: 'III Јован 1:1'")
		expect(p.parse("3. Јован 1:1").osis()).toEqual("3John.1.1", "parsing: '3. Јован 1:1'")
		expect(p.parse("3 Јован 1:1").osis()).toEqual("3John.1.1", "parsing: '3 Јован 1:1'")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1", "parsing: '3John 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ТРЕТА ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕТА ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ТРЕТО ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕТО ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("III. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("3.. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("III ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'III ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("3. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: '3. ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ТРЕТА ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕТА ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ТРЕТО ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕТО ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("3 ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: '3 ПОСЛАНИЕ НА АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("III. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("3.. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("III ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'III ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("3. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: '3. ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("3 ПИСМО ОД АПОСТОЛ ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: '3 ПИСМО ОД АПОСТОЛ ЈОВАН 1:1'")
		expect(p.parse("ТРЕТА ЈОВАНОВО 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕТА ЈОВАНОВО 1:1'")
		expect(p.parse("ТРЕТО ЈОВАНОВО 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕТО ЈОВАНОВО 1:1'")
		expect(p.parse("III. ЈОВАНОВО 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. ЈОВАНОВО 1:1'")
		expect(p.parse("3.. ЈОВАНОВО 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. ЈОВАНОВО 1:1'")
		expect(p.parse("III ЈОВАНОВО 1:1").osis()).toEqual("3John.1.1", "parsing: 'III ЈОВАНОВО 1:1'")
		expect(p.parse("3. ЈОВАНОВО 1:1").osis()).toEqual("3John.1.1", "parsing: '3. ЈОВАНОВО 1:1'")
		expect(p.parse("ТРЕТА ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕТА ЈОВАН 1:1'")
		expect(p.parse("ТРЕТО ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕТО ЈОВАН 1:1'")
		expect(p.parse("3 ЈОВАНОВО 1:1").osis()).toEqual("3John.1.1", "parsing: '3 ЈОВАНОВО 1:1'")
		expect(p.parse("III. ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. ЈОВАН 1:1'")
		expect(p.parse("3.. ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. ЈОВАН 1:1'")
		expect(p.parse("III ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: 'III ЈОВАН 1:1'")
		expect(p.parse("3. ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: '3. ЈОВАН 1:1'")
		expect(p.parse("3 ЈОВАН 1:1").osis()).toEqual("3John.1.1", "parsing: '3 ЈОВАН 1:1'")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1", "parsing: '3JOHN 1:1'")
		;
      return true;
    });
  });

  describe("Localized book John (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: John (mk)", function() {
      
		expect(p.parse("Евангелието според Јован 1:1").osis()).toEqual("John.1.1", "parsing: 'Евангелието според Јован 1:1'")
		expect(p.parse("Евангелие според Јован 1:1").osis()).toEqual("John.1.1", "parsing: 'Евангелие според Јован 1:1'")
		expect(p.parse("Јован 1:1").osis()).toEqual("John.1.1", "parsing: 'Јован 1:1'")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1", "parsing: 'John 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЕВАНГЕЛИЕТО СПОРЕД ЈОВАН 1:1").osis()).toEqual("John.1.1", "parsing: 'ЕВАНГЕЛИЕТО СПОРЕД ЈОВАН 1:1'")
		expect(p.parse("ЕВАНГЕЛИЕ СПОРЕД ЈОВАН 1:1").osis()).toEqual("John.1.1", "parsing: 'ЕВАНГЕЛИЕ СПОРЕД ЈОВАН 1:1'")
		expect(p.parse("ЈОВАН 1:1").osis()).toEqual("John.1.1", "parsing: 'ЈОВАН 1:1'")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1", "parsing: 'JOHN 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Acts (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Acts (mk)", function() {
      
		expect(p.parse("Дела на светите апостоли 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Дела на светите апостоли 1:1'")
		expect(p.parse("Дела на апостолите 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Дела на апостолите 1:1'")
		expect(p.parse("Дела Ап 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Дела Ап 1:1'")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Acts 1:1'")
		expect(p.parse("Дела 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Дела 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДЕЛА НА СВЕТИТЕ АПОСТОЛИ 1:1").osis()).toEqual("Acts.1.1", "parsing: 'ДЕЛА НА СВЕТИТЕ АПОСТОЛИ 1:1'")
		expect(p.parse("ДЕЛА НА АПОСТОЛИТЕ 1:1").osis()).toEqual("Acts.1.1", "parsing: 'ДЕЛА НА АПОСТОЛИТЕ 1:1'")
		expect(p.parse("ДЕЛА АП 1:1").osis()).toEqual("Acts.1.1", "parsing: 'ДЕЛА АП 1:1'")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1", "parsing: 'ACTS 1:1'")
		expect(p.parse("ДЕЛА 1:1").osis()).toEqual("Acts.1.1", "parsing: 'ДЕЛА 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Rom (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rom (mk)", function() {
      
		expect(p.parse("Писмо од апостол Павле до христијаните во Рим 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Писмо од апостол Павле до христијаните во Рим 1:1'")
		expect(p.parse("Римјаните 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Римјаните 1:1'")
		expect(p.parse("Римјани 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Римјани 1:1'")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Rom 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО РИМ 1:1").osis()).toEqual("Rom.1.1", "parsing: 'ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО РИМ 1:1'")
		expect(p.parse("РИМЈАНИТЕ 1:1").osis()).toEqual("Rom.1.1", "parsing: 'РИМЈАНИТЕ 1:1'")
		expect(p.parse("РИМЈАНИ 1:1").osis()).toEqual("Rom.1.1", "parsing: 'РИМЈАНИ 1:1'")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'ROM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Cor (mk)", function() {
      
		expect(p.parse("Втора писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Втора писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("Второ писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Второ писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("2.. писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("II. писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("2. писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("II писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("2 писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("Втора Коринтјаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Втора Коринтјаните 1:1'")
		expect(p.parse("Второ Коринтјаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Второ Коринтјаните 1:1'")
		expect(p.parse("Втора Коринканите 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Втора Коринканите 1:1'")
		expect(p.parse("Втора Коринќаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Втора Коринќаните 1:1'")
		expect(p.parse("Второ Коринканите 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Второ Коринканите 1:1'")
		expect(p.parse("Второ Коринќаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Второ Коринќаните 1:1'")
		expect(p.parse("2.. Коринтјаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. Коринтјаните 1:1'")
		expect(p.parse("II. Коринтјаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. Коринтјаните 1:1'")
		expect(p.parse("Втора Коринтјани 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Втора Коринтјани 1:1'")
		expect(p.parse("Второ Коринтјани 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Второ Коринтјани 1:1'")
		expect(p.parse("2. Коринтјаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. Коринтјаните 1:1'")
		expect(p.parse("2.. Коринканите 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. Коринканите 1:1'")
		expect(p.parse("2.. Коринќаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. Коринќаните 1:1'")
		expect(p.parse("II Коринтјаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II Коринтјаните 1:1'")
		expect(p.parse("II. Коринканите 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. Коринканите 1:1'")
		expect(p.parse("II. Коринќаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. Коринќаните 1:1'")
		expect(p.parse("2 Коринтјаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 Коринтјаните 1:1'")
		expect(p.parse("2. Коринканите 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. Коринканите 1:1'")
		expect(p.parse("2. Коринќаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. Коринќаните 1:1'")
		expect(p.parse("2.. Коринтјани 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. Коринтјани 1:1'")
		expect(p.parse("II Коринканите 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II Коринканите 1:1'")
		expect(p.parse("II Коринќаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II Коринќаните 1:1'")
		expect(p.parse("II. Коринтјани 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. Коринтјани 1:1'")
		expect(p.parse("2 Коринканите 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 Коринканите 1:1'")
		expect(p.parse("2 Коринќаните 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 Коринќаните 1:1'")
		expect(p.parse("2. Коринтјани 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. Коринтјани 1:1'")
		expect(p.parse("II Коринтјани 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II Коринтјани 1:1'")
		expect(p.parse("2 Коринтјани 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 Коринтјани 1:1'")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2Cor 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ВТОРА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ВТОРА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("ВТОРО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ВТОРО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("2.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("II. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("2. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("II ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("2 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("ВТОРА КОРИНТЈАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ВТОРА КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("ВТОРО КОРИНТЈАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ВТОРО КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("ВТОРА КОРИНКАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ВТОРА КОРИНКАНИТЕ 1:1'")
		expect(p.parse("ВТОРА КОРИНЌАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ВТОРА КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("ВТОРО КОРИНКАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ВТОРО КОРИНКАНИТЕ 1:1'")
		expect(p.parse("ВТОРО КОРИНЌАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ВТОРО КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("2.. КОРИНТЈАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("II. КОРИНТЈАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("ВТОРА КОРИНТЈАНИ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ВТОРА КОРИНТЈАНИ 1:1'")
		expect(p.parse("ВТОРО КОРИНТЈАНИ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ВТОРО КОРИНТЈАНИ 1:1'")
		expect(p.parse("2. КОРИНТЈАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("2.. КОРИНКАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. КОРИНКАНИТЕ 1:1'")
		expect(p.parse("2.. КОРИНЌАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("II КОРИНТЈАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("II. КОРИНКАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. КОРИНКАНИТЕ 1:1'")
		expect(p.parse("II. КОРИНЌАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("2 КОРИНТЈАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("2. КОРИНКАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. КОРИНКАНИТЕ 1:1'")
		expect(p.parse("2. КОРИНЌАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("2.. КОРИНТЈАНИ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. КОРИНТЈАНИ 1:1'")
		expect(p.parse("II КОРИНКАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II КОРИНКАНИТЕ 1:1'")
		expect(p.parse("II КОРИНЌАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("II. КОРИНТЈАНИ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. КОРИНТЈАНИ 1:1'")
		expect(p.parse("2 КОРИНКАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 КОРИНКАНИТЕ 1:1'")
		expect(p.parse("2 КОРИНЌАНИТЕ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("2. КОРИНТЈАНИ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. КОРИНТЈАНИ 1:1'")
		expect(p.parse("II КОРИНТЈАНИ 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II КОРИНТЈАНИ 1:1'")
		expect(p.parse("2 КОРИНТЈАНИ 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 КОРИНТЈАНИ 1:1'")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2COR 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Cor (mk)", function() {
      
		expect(p.parse("Прва писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прва писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("Прво писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прво писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("1.. писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("1. писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("I. писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("1 писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("I писмо од апостол Павле до христијаните во Коринт 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I писмо од апостол Павле до христијаните во Коринт 1:1'")
		expect(p.parse("Прва Коринтјаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прва Коринтјаните 1:1'")
		expect(p.parse("Прво Коринтјаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прво Коринтјаните 1:1'")
		expect(p.parse("1.. Коринтјаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. Коринтјаните 1:1'")
		expect(p.parse("Прва Коринканите 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прва Коринканите 1:1'")
		expect(p.parse("Прва Коринќаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прва Коринќаните 1:1'")
		expect(p.parse("Прво Коринканите 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прво Коринканите 1:1'")
		expect(p.parse("Прво Коринќаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прво Коринќаните 1:1'")
		expect(p.parse("1. Коринтјаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. Коринтјаните 1:1'")
		expect(p.parse("1.. Коринканите 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. Коринканите 1:1'")
		expect(p.parse("1.. Коринќаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. Коринќаните 1:1'")
		expect(p.parse("I. Коринтјаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. Коринтјаните 1:1'")
		expect(p.parse("Прва Коринтјани 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прва Коринтјани 1:1'")
		expect(p.parse("Прво Коринтјани 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прво Коринтјани 1:1'")
		expect(p.parse("1 Коринтјаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 Коринтјаните 1:1'")
		expect(p.parse("1. Коринканите 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. Коринканите 1:1'")
		expect(p.parse("1. Коринќаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. Коринќаните 1:1'")
		expect(p.parse("1.. Коринтјани 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. Коринтјани 1:1'")
		expect(p.parse("I Коринтјаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I Коринтјаните 1:1'")
		expect(p.parse("I. Коринканите 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. Коринканите 1:1'")
		expect(p.parse("I. Коринќаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. Коринќаните 1:1'")
		expect(p.parse("1 Коринканите 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 Коринканите 1:1'")
		expect(p.parse("1 Коринќаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 Коринќаните 1:1'")
		expect(p.parse("1. Коринтјани 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. Коринтјани 1:1'")
		expect(p.parse("I Коринканите 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I Коринканите 1:1'")
		expect(p.parse("I Коринќаните 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I Коринќаните 1:1'")
		expect(p.parse("I. Коринтјани 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. Коринтјани 1:1'")
		expect(p.parse("1 Коринтјани 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 Коринтјани 1:1'")
		expect(p.parse("I Коринтјани 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I Коринтјани 1:1'")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1Cor 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("ПРВО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("1.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("1. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("I. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("1 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("I ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОРИНТ 1:1'")
		expect(p.parse("ПРВА КОРИНТЈАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВА КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("ПРВО КОРИНТЈАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВО КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("1.. КОРИНТЈАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("ПРВА КОРИНКАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВА КОРИНКАНИТЕ 1:1'")
		expect(p.parse("ПРВА КОРИНЌАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВА КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("ПРВО КОРИНКАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВО КОРИНКАНИТЕ 1:1'")
		expect(p.parse("ПРВО КОРИНЌАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВО КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("1. КОРИНТЈАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("1.. КОРИНКАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. КОРИНКАНИТЕ 1:1'")
		expect(p.parse("1.. КОРИНЌАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("I. КОРИНТЈАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("ПРВА КОРИНТЈАНИ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВА КОРИНТЈАНИ 1:1'")
		expect(p.parse("ПРВО КОРИНТЈАНИ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВО КОРИНТЈАНИ 1:1'")
		expect(p.parse("1 КОРИНТЈАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("1. КОРИНКАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. КОРИНКАНИТЕ 1:1'")
		expect(p.parse("1. КОРИНЌАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("1.. КОРИНТЈАНИ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. КОРИНТЈАНИ 1:1'")
		expect(p.parse("I КОРИНТЈАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I КОРИНТЈАНИТЕ 1:1'")
		expect(p.parse("I. КОРИНКАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. КОРИНКАНИТЕ 1:1'")
		expect(p.parse("I. КОРИНЌАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("1 КОРИНКАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 КОРИНКАНИТЕ 1:1'")
		expect(p.parse("1 КОРИНЌАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("1. КОРИНТЈАНИ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. КОРИНТЈАНИ 1:1'")
		expect(p.parse("I КОРИНКАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I КОРИНКАНИТЕ 1:1'")
		expect(p.parse("I КОРИНЌАНИТЕ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I КОРИНЌАНИТЕ 1:1'")
		expect(p.parse("I. КОРИНТЈАНИ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. КОРИНТЈАНИ 1:1'")
		expect(p.parse("1 КОРИНТЈАНИ 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 КОРИНТЈАНИ 1:1'")
		expect(p.parse("I КОРИНТЈАНИ 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I КОРИНТЈАНИ 1:1'")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1COR 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Gal (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gal (mk)", function() {
      
		expect(p.parse("Писмо од апостол Павле до христијаните во Галатија 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Писмо од апостол Павле до христијаните во Галатија 1:1'")
		expect(p.parse("Галатјаните 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Галатјаните 1:1'")
		expect(p.parse("Галатјани 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Галатјани 1:1'")
		expect(p.parse("Галатите 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Галатите 1:1'")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Gal 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО ГАЛАТИЈА 1:1").osis()).toEqual("Gal.1.1", "parsing: 'ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО ГАЛАТИЈА 1:1'")
		expect(p.parse("ГАЛАТЈАНИТЕ 1:1").osis()).toEqual("Gal.1.1", "parsing: 'ГАЛАТЈАНИТЕ 1:1'")
		expect(p.parse("ГАЛАТЈАНИ 1:1").osis()).toEqual("Gal.1.1", "parsing: 'ГАЛАТЈАНИ 1:1'")
		expect(p.parse("ГАЛАТИТЕ 1:1").osis()).toEqual("Gal.1.1", "parsing: 'ГАЛАТИТЕ 1:1'")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1", "parsing: 'GAL 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Eph (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eph (mk)", function() {
      
		expect(p.parse("Писмо од апостол Павле до христијаните во Ефес 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Писмо од апостол Павле до христијаните во Ефес 1:1'")
		expect(p.parse("Ефесјаните 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Ефесјаните 1:1'")
		expect(p.parse("Ефешаните 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Ефешаните 1:1'")
		expect(p.parse("Ефесјани 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Ефесјани 1:1'")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Eph 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО ЕФЕС 1:1").osis()).toEqual("Eph.1.1", "parsing: 'ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО ЕФЕС 1:1'")
		expect(p.parse("ЕФЕСЈАНИТЕ 1:1").osis()).toEqual("Eph.1.1", "parsing: 'ЕФЕСЈАНИТЕ 1:1'")
		expect(p.parse("ЕФЕШАНИТЕ 1:1").osis()).toEqual("Eph.1.1", "parsing: 'ЕФЕШАНИТЕ 1:1'")
		expect(p.parse("ЕФЕСЈАНИ 1:1").osis()).toEqual("Eph.1.1", "parsing: 'ЕФЕСЈАНИ 1:1'")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1", "parsing: 'EPH 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Phil (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phil (mk)", function() {
      
		expect(p.parse("Писмо од апостол Павле до христијаните во Филипи 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Писмо од апостол Павле до христијаните во Филипи 1:1'")
		expect(p.parse("Филипјаните 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Филипјаните 1:1'")
		expect(p.parse("Филипјани 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Филипјани 1:1'")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Phil 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО ФИЛИПИ 1:1").osis()).toEqual("Phil.1.1", "parsing: 'ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО ФИЛИПИ 1:1'")
		expect(p.parse("ФИЛИПЈАНИТЕ 1:1").osis()).toEqual("Phil.1.1", "parsing: 'ФИЛИПЈАНИТЕ 1:1'")
		expect(p.parse("ФИЛИПЈАНИ 1:1").osis()).toEqual("Phil.1.1", "parsing: 'ФИЛИПЈАНИ 1:1'")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1", "parsing: 'PHIL 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Col (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Col (mk)", function() {
      
		expect(p.parse("Писмо од апостол Павле до христијаните во Колос 1:1").osis()).toEqual("Col.1.1", "parsing: 'Писмо од апостол Павле до христијаните во Колос 1:1'")
		expect(p.parse("Колошаните 1:1").osis()).toEqual("Col.1.1", "parsing: 'Колошаните 1:1'")
		expect(p.parse("Колосјани 1:1").osis()).toEqual("Col.1.1", "parsing: 'Колосјани 1:1'")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1", "parsing: 'Col 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОЛОС 1:1").osis()).toEqual("Col.1.1", "parsing: 'ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО КОЛОС 1:1'")
		expect(p.parse("КОЛОШАНИТЕ 1:1").osis()).toEqual("Col.1.1", "parsing: 'КОЛОШАНИТЕ 1:1'")
		expect(p.parse("КОЛОСЈАНИ 1:1").osis()).toEqual("Col.1.1", "parsing: 'КОЛОСЈАНИ 1:1'")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1", "parsing: 'COL 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Thess (mk)", function() {
      
		expect(p.parse("Втора писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Втора писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("Второ писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Второ писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("2.. писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("II. писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("2. писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("II писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("2 писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("Втора Солунјаните 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Втора Солунјаните 1:1'")
		expect(p.parse("Второ Солунјаните 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Второ Солунјаните 1:1'")
		expect(p.parse("2.. Солунјаните 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. Солунјаните 1:1'")
		expect(p.parse("II. Солунјаните 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Солунјаните 1:1'")
		expect(p.parse("Втора Солунците 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Втора Солунците 1:1'")
		expect(p.parse("Втора Солунјани 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Втора Солунјани 1:1'")
		expect(p.parse("Второ Солунците 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Второ Солунците 1:1'")
		expect(p.parse("Второ Солунјани 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Второ Солунјани 1:1'")
		expect(p.parse("2. Солунјаните 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Солунјаните 1:1'")
		expect(p.parse("II Солунјаните 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Солунјаните 1:1'")
		expect(p.parse("2 Солунјаните 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Солунјаните 1:1'")
		expect(p.parse("2.. Солунците 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. Солунците 1:1'")
		expect(p.parse("2.. Солунјани 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. Солунјани 1:1'")
		expect(p.parse("II. Солунците 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Солунците 1:1'")
		expect(p.parse("II. Солунјани 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Солунјани 1:1'")
		expect(p.parse("2. Солунците 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Солунците 1:1'")
		expect(p.parse("2. Солунјани 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Солунјани 1:1'")
		expect(p.parse("II Солунците 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Солунците 1:1'")
		expect(p.parse("II Солунјани 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Солунјани 1:1'")
		expect(p.parse("2 Солунците 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Солунците 1:1'")
		expect(p.parse("2 Солунјани 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Солунјани 1:1'")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2Thess 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ВТОРА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'ВТОРА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("ВТОРО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'ВТОРО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("2.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("II. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("2. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("II ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("2 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("ВТОРА СОЛУНЈАНИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'ВТОРА СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("ВТОРО СОЛУНЈАНИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'ВТОРО СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("2.. СОЛУНЈАНИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("II. СОЛУНЈАНИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("ВТОРА СОЛУНЦИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'ВТОРА СОЛУНЦИТЕ 1:1'")
		expect(p.parse("ВТОРА СОЛУНЈАНИ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'ВТОРА СОЛУНЈАНИ 1:1'")
		expect(p.parse("ВТОРО СОЛУНЦИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'ВТОРО СОЛУНЦИТЕ 1:1'")
		expect(p.parse("ВТОРО СОЛУНЈАНИ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'ВТОРО СОЛУНЈАНИ 1:1'")
		expect(p.parse("2. СОЛУНЈАНИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("II СОЛУНЈАНИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("2 СОЛУНЈАНИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("2.. СОЛУНЦИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. СОЛУНЦИТЕ 1:1'")
		expect(p.parse("2.. СОЛУНЈАНИ 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. СОЛУНЈАНИ 1:1'")
		expect(p.parse("II. СОЛУНЦИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. СОЛУНЦИТЕ 1:1'")
		expect(p.parse("II. СОЛУНЈАНИ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. СОЛУНЈАНИ 1:1'")
		expect(p.parse("2. СОЛУНЦИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. СОЛУНЦИТЕ 1:1'")
		expect(p.parse("2. СОЛУНЈАНИ 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. СОЛУНЈАНИ 1:1'")
		expect(p.parse("II СОЛУНЦИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II СОЛУНЦИТЕ 1:1'")
		expect(p.parse("II СОЛУНЈАНИ 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II СОЛУНЈАНИ 1:1'")
		expect(p.parse("2 СОЛУНЦИТЕ 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 СОЛУНЦИТЕ 1:1'")
		expect(p.parse("2 СОЛУНЈАНИ 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 СОЛУНЈАНИ 1:1'")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2THESS 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Thess (mk)", function() {
      
		expect(p.parse("Прва писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Прва писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("Прво писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Прво писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("1.. писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("1. писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("I. писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("1 писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("I писмо од апостол Павле до христијаните во Солун 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I писмо од апостол Павле до христијаните во Солун 1:1'")
		expect(p.parse("Прва Солунјаните 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Прва Солунјаните 1:1'")
		expect(p.parse("Прво Солунјаните 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Прво Солунјаните 1:1'")
		expect(p.parse("1.. Солунјаните 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. Солунјаните 1:1'")
		expect(p.parse("1. Солунјаните 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Солунјаните 1:1'")
		expect(p.parse("I. Солунјаните 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Солунјаните 1:1'")
		expect(p.parse("Прва Солунците 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Прва Солунците 1:1'")
		expect(p.parse("Прва Солунјани 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Прва Солунјани 1:1'")
		expect(p.parse("Прво Солунците 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Прво Солунците 1:1'")
		expect(p.parse("Прво Солунјани 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Прво Солунјани 1:1'")
		expect(p.parse("1 Солунјаните 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Солунјаните 1:1'")
		expect(p.parse("1.. Солунците 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. Солунците 1:1'")
		expect(p.parse("1.. Солунјани 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. Солунјани 1:1'")
		expect(p.parse("I Солунјаните 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Солунјаните 1:1'")
		expect(p.parse("1. Солунците 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Солунците 1:1'")
		expect(p.parse("1. Солунјани 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Солунјани 1:1'")
		expect(p.parse("I. Солунците 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Солунците 1:1'")
		expect(p.parse("I. Солунјани 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Солунјани 1:1'")
		expect(p.parse("1 Солунците 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Солунците 1:1'")
		expect(p.parse("1 Солунјани 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Солунјани 1:1'")
		expect(p.parse("I Солунците 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Солунците 1:1'")
		expect(p.parse("I Солунјани 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Солунјани 1:1'")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1Thess 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'ПРВА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("ПРВО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'ПРВО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("1.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("1. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("I. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("1 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("I ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ХРИСТИЈАНИТЕ ВО СОЛУН 1:1'")
		expect(p.parse("ПРВА СОЛУНЈАНИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'ПРВА СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("ПРВО СОЛУНЈАНИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'ПРВО СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("1.. СОЛУНЈАНИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("1. СОЛУНЈАНИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("I. СОЛУНЈАНИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("ПРВА СОЛУНЦИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'ПРВА СОЛУНЦИТЕ 1:1'")
		expect(p.parse("ПРВА СОЛУНЈАНИ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'ПРВА СОЛУНЈАНИ 1:1'")
		expect(p.parse("ПРВО СОЛУНЦИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'ПРВО СОЛУНЦИТЕ 1:1'")
		expect(p.parse("ПРВО СОЛУНЈАНИ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'ПРВО СОЛУНЈАНИ 1:1'")
		expect(p.parse("1 СОЛУНЈАНИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("1.. СОЛУНЦИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. СОЛУНЦИТЕ 1:1'")
		expect(p.parse("1.. СОЛУНЈАНИ 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. СОЛУНЈАНИ 1:1'")
		expect(p.parse("I СОЛУНЈАНИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I СОЛУНЈАНИТЕ 1:1'")
		expect(p.parse("1. СОЛУНЦИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. СОЛУНЦИТЕ 1:1'")
		expect(p.parse("1. СОЛУНЈАНИ 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. СОЛУНЈАНИ 1:1'")
		expect(p.parse("I. СОЛУНЦИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. СОЛУНЦИТЕ 1:1'")
		expect(p.parse("I. СОЛУНЈАНИ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. СОЛУНЈАНИ 1:1'")
		expect(p.parse("1 СОЛУНЦИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 СОЛУНЦИТЕ 1:1'")
		expect(p.parse("1 СОЛУНЈАНИ 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 СОЛУНЈАНИ 1:1'")
		expect(p.parse("I СОЛУНЦИТЕ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I СОЛУНЦИТЕ 1:1'")
		expect(p.parse("I СОЛУНЈАНИ 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I СОЛУНЈАНИ 1:1'")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1THESS 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Tim (mk)", function() {
      
		expect(p.parse("Втора писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Втора писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("Второ писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Второ писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("2.. писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2.. писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("II. писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("2. писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("II писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("2 писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("Втора Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Втора Тимотеј 1:1'")
		expect(p.parse("Второ Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Второ Тимотеј 1:1'")
		expect(p.parse("2.. Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2.. Тимотеј 1:1'")
		expect(p.parse("II. Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. Тимотеј 1:1'")
		expect(p.parse("2. Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. Тимотеј 1:1'")
		expect(p.parse("II Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II Тимотеј 1:1'")
		expect(p.parse("2 Тимотеј 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 Тимотеј 1:1'")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2Tim 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ВТОРА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'ВТОРА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("ВТОРО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'ВТОРО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("2.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("II. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("2. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("II ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("2 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("ВТОРА ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'ВТОРА ТИМОТЕЈ 1:1'")
		expect(p.parse("ВТОРО ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'ВТОРО ТИМОТЕЈ 1:1'")
		expect(p.parse("2.. ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2.. ТИМОТЕЈ 1:1'")
		expect(p.parse("II. ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. ТИМОТЕЈ 1:1'")
		expect(p.parse("2. ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. ТИМОТЕЈ 1:1'")
		expect(p.parse("II ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II ТИМОТЕЈ 1:1'")
		expect(p.parse("2 ТИМОТЕЈ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 ТИМОТЕЈ 1:1'")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2TIM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Tim (mk)", function() {
      
		expect(p.parse("Прва писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Прва писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("Прво писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Прво писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("1.. писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1.. писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("1. писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("I. писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("1 писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("I писмо од апостол Павле до Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I писмо од апостол Павле до Тимотеј 1:1'")
		expect(p.parse("Прва Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Прва Тимотеј 1:1'")
		expect(p.parse("Прво Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Прво Тимотеј 1:1'")
		expect(p.parse("1.. Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1.. Тимотеј 1:1'")
		expect(p.parse("1. Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. Тимотеј 1:1'")
		expect(p.parse("I. Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. Тимотеј 1:1'")
		expect(p.parse("1 Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 Тимотеј 1:1'")
		expect(p.parse("I Тимотеј 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I Тимотеј 1:1'")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1Tim 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'ПРВА ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("ПРВО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'ПРВО ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("1.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1.. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("1. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("I. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("1 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("I ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИМОТЕЈ 1:1'")
		expect(p.parse("ПРВА ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'ПРВА ТИМОТЕЈ 1:1'")
		expect(p.parse("ПРВО ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'ПРВО ТИМОТЕЈ 1:1'")
		expect(p.parse("1.. ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1.. ТИМОТЕЈ 1:1'")
		expect(p.parse("1. ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. ТИМОТЕЈ 1:1'")
		expect(p.parse("I. ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. ТИМОТЕЈ 1:1'")
		expect(p.parse("1 ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 ТИМОТЕЈ 1:1'")
		expect(p.parse("I ТИМОТЕЈ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I ТИМОТЕЈ 1:1'")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1TIM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Titus (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Titus (mk)", function() {
      
		expect(p.parse("Писмо од апостол Павле до Тит 1:1").osis()).toEqual("Titus.1.1", "parsing: 'Писмо од апостол Павле до Тит 1:1'")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1", "parsing: 'Titus 1:1'")
		expect(p.parse("Тит 1:1").osis()).toEqual("Titus.1.1", "parsing: 'Тит 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИТ 1:1").osis()).toEqual("Titus.1.1", "parsing: 'ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ТИТ 1:1'")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1", "parsing: 'TITUS 1:1'")
		expect(p.parse("ТИТ 1:1").osis()).toEqual("Titus.1.1", "parsing: 'ТИТ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Phlm (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phlm (mk)", function() {
      
		expect(p.parse("Писмо од апостол Павле до Филемон 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Писмо од апостол Павле до Филемон 1:1'")
		expect(p.parse("Филемон 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Филемон 1:1'")
		expect(p.parse("Филимон 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Филимон 1:1'")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Phlm 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ФИЛЕМОН 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'ПИСМО ОД АПОСТОЛ ПАВЛЕ ДО ФИЛЕМОН 1:1'")
		expect(p.parse("ФИЛЕМОН 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'ФИЛЕМОН 1:1'")
		expect(p.parse("ФИЛИМОН 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'ФИЛИМОН 1:1'")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'PHLM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Heb (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Heb (mk)", function() {
      
		expect(p.parse("Писмо до Евреите 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Писмо до Евреите 1:1'")
		expect(p.parse("Евреите 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Евреите 1:1'")
		expect(p.parse("Евреи 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Евреи 1:1'")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Heb 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПИСМО ДО ЕВРЕИТЕ 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ПИСМО ДО ЕВРЕИТЕ 1:1'")
		expect(p.parse("ЕВРЕИТЕ 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ЕВРЕИТЕ 1:1'")
		expect(p.parse("ЕВРЕИ 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ЕВРЕИ 1:1'")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1", "parsing: 'HEB 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jas (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jas (mk)", function() {
      
		expect(p.parse("Послание на апостол Јаков 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Послание на апостол Јаков 1:1'")
		expect(p.parse("Писмо од апостол Јаков 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Писмо од апостол Јаков 1:1'")
		expect(p.parse("Јаков 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Јаков 1:1'")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Jas 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЕ НА АПОСТОЛ ЈАКОВ 1:1").osis()).toEqual("Jas.1.1", "parsing: 'ПОСЛАНИЕ НА АПОСТОЛ ЈАКОВ 1:1'")
		expect(p.parse("ПИСМО ОД АПОСТОЛ ЈАКОВ 1:1").osis()).toEqual("Jas.1.1", "parsing: 'ПИСМО ОД АПОСТОЛ ЈАКОВ 1:1'")
		expect(p.parse("ЈАКОВ 1:1").osis()).toEqual("Jas.1.1", "parsing: 'ЈАКОВ 1:1'")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1", "parsing: 'JAS 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Pet (mk)", function() {
      
		expect(p.parse("Втора послание на апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Втора послание на апостол Петар 1:1'")
		expect(p.parse("Второ послание на апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Второ послание на апостол Петар 1:1'")
		expect(p.parse("2.. послание на апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. послание на апостол Петар 1:1'")
		expect(p.parse("II. послание на апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. послание на апостол Петар 1:1'")
		expect(p.parse("2. послание на апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. послание на апостол Петар 1:1'")
		expect(p.parse("II послание на апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II послание на апостол Петар 1:1'")
		expect(p.parse("Втора писмо од апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Втора писмо од апостол Петар 1:1'")
		expect(p.parse("Второ писмо од апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Второ писмо од апостол Петар 1:1'")
		expect(p.parse("2 послание на апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 послание на апостол Петар 1:1'")
		expect(p.parse("2.. писмо од апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. писмо од апостол Петар 1:1'")
		expect(p.parse("II. писмо од апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. писмо од апостол Петар 1:1'")
		expect(p.parse("2. писмо од апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. писмо од апостол Петар 1:1'")
		expect(p.parse("II писмо од апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II писмо од апостол Петар 1:1'")
		expect(p.parse("2 писмо од апостол Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 писмо од апостол Петар 1:1'")
		expect(p.parse("Втора Петрово 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Втора Петрово 1:1'")
		expect(p.parse("Второ Петрово 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Второ Петрово 1:1'")
		expect(p.parse("2.. Петрово 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. Петрово 1:1'")
		expect(p.parse("II. Петрово 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. Петрово 1:1'")
		expect(p.parse("Втора Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Втора Петар 1:1'")
		expect(p.parse("Второ Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Второ Петар 1:1'")
		expect(p.parse("2. Петрово 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. Петрово 1:1'")
		expect(p.parse("II Петрово 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II Петрово 1:1'")
		expect(p.parse("2 Петрово 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 Петрово 1:1'")
		expect(p.parse("2.. Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. Петар 1:1'")
		expect(p.parse("II. Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. Петар 1:1'")
		expect(p.parse("2. Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. Петар 1:1'")
		expect(p.parse("II Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II Петар 1:1'")
		expect(p.parse("2 Петар 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 Петар 1:1'")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2Pet 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ВТОРА ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'ВТОРА ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("ВТОРО ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'ВТОРО ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("2.. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("II. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("2. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("II ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("ВТОРА ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'ВТОРА ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("ВТОРО ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'ВТОРО ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("2 ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("2.. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("II. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("2. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("II ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("2 ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("ВТОРА ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'ВТОРА ПЕТРОВО 1:1'")
		expect(p.parse("ВТОРО ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'ВТОРО ПЕТРОВО 1:1'")
		expect(p.parse("2.. ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. ПЕТРОВО 1:1'")
		expect(p.parse("II. ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. ПЕТРОВО 1:1'")
		expect(p.parse("ВТОРА ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'ВТОРА ПЕТАР 1:1'")
		expect(p.parse("ВТОРО ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'ВТОРО ПЕТАР 1:1'")
		expect(p.parse("2. ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. ПЕТРОВО 1:1'")
		expect(p.parse("II ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II ПЕТРОВО 1:1'")
		expect(p.parse("2 ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 ПЕТРОВО 1:1'")
		expect(p.parse("2.. ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. ПЕТАР 1:1'")
		expect(p.parse("II. ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. ПЕТАР 1:1'")
		expect(p.parse("2. ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. ПЕТАР 1:1'")
		expect(p.parse("II ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II ПЕТАР 1:1'")
		expect(p.parse("2 ПЕТАР 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 ПЕТАР 1:1'")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2PET 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Pet (mk)", function() {
      
		expect(p.parse("Прва послание на апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Прва послание на апостол Петар 1:1'")
		expect(p.parse("Прво послание на апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Прво послание на апостол Петар 1:1'")
		expect(p.parse("1.. послание на апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. послание на апостол Петар 1:1'")
		expect(p.parse("1. послание на апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. послание на апостол Петар 1:1'")
		expect(p.parse("I. послание на апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. послание на апостол Петар 1:1'")
		expect(p.parse("1 послание на апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 послание на апостол Петар 1:1'")
		expect(p.parse("I послание на апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I послание на апостол Петар 1:1'")
		expect(p.parse("Прва писмо од апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Прва писмо од апостол Петар 1:1'")
		expect(p.parse("Прво писмо од апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Прво писмо од апостол Петар 1:1'")
		expect(p.parse("1.. писмо од апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. писмо од апостол Петар 1:1'")
		expect(p.parse("1. писмо од апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. писмо од апостол Петар 1:1'")
		expect(p.parse("I. писмо од апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. писмо од апостол Петар 1:1'")
		expect(p.parse("1 писмо од апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 писмо од апостол Петар 1:1'")
		expect(p.parse("I писмо од апостол Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I писмо од апостол Петар 1:1'")
		expect(p.parse("Прва Петрово 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Прва Петрово 1:1'")
		expect(p.parse("Прво Петрово 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Прво Петрово 1:1'")
		expect(p.parse("1.. Петрово 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. Петрово 1:1'")
		expect(p.parse("1. Петрово 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. Петрово 1:1'")
		expect(p.parse("I. Петрово 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. Петрово 1:1'")
		expect(p.parse("Прва Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Прва Петар 1:1'")
		expect(p.parse("Прво Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Прво Петар 1:1'")
		expect(p.parse("1 Петрово 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 Петрово 1:1'")
		expect(p.parse("1.. Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. Петар 1:1'")
		expect(p.parse("I Петрово 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I Петрово 1:1'")
		expect(p.parse("1. Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. Петар 1:1'")
		expect(p.parse("I. Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. Петар 1:1'")
		expect(p.parse("1 Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 Петар 1:1'")
		expect(p.parse("I Петар 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I Петар 1:1'")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1Pet 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'ПРВА ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("ПРВО ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'ПРВО ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("1.. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("1. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("I. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("1 ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("I ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I ПОСЛАНИЕ НА АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("ПРВА ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'ПРВА ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("ПРВО ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'ПРВО ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("1.. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("1. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("I. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("1 ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("I ПИСМО ОД АПОСТОЛ ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I ПИСМО ОД АПОСТОЛ ПЕТАР 1:1'")
		expect(p.parse("ПРВА ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'ПРВА ПЕТРОВО 1:1'")
		expect(p.parse("ПРВО ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'ПРВО ПЕТРОВО 1:1'")
		expect(p.parse("1.. ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. ПЕТРОВО 1:1'")
		expect(p.parse("1. ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. ПЕТРОВО 1:1'")
		expect(p.parse("I. ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. ПЕТРОВО 1:1'")
		expect(p.parse("ПРВА ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'ПРВА ПЕТАР 1:1'")
		expect(p.parse("ПРВО ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'ПРВО ПЕТАР 1:1'")
		expect(p.parse("1 ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 ПЕТРОВО 1:1'")
		expect(p.parse("1.. ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. ПЕТАР 1:1'")
		expect(p.parse("I ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I ПЕТРОВО 1:1'")
		expect(p.parse("1. ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. ПЕТАР 1:1'")
		expect(p.parse("I. ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. ПЕТАР 1:1'")
		expect(p.parse("1 ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 ПЕТАР 1:1'")
		expect(p.parse("I ПЕТАР 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I ПЕТАР 1:1'")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1PET 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jude (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jude (mk)", function() {
      
		expect(p.parse("Послание на апостол Јуда 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Послание на апостол Јуда 1:1'")
		expect(p.parse("Писмо од апостол Јуда 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Писмо од апостол Јуда 1:1'")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Jude 1:1'")
		expect(p.parse("Јуда 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Јуда 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЕ НА АПОСТОЛ ЈУДА 1:1").osis()).toEqual("Jude.1.1", "parsing: 'ПОСЛАНИЕ НА АПОСТОЛ ЈУДА 1:1'")
		expect(p.parse("ПИСМО ОД АПОСТОЛ ЈУДА 1:1").osis()).toEqual("Jude.1.1", "parsing: 'ПИСМО ОД АПОСТОЛ ЈУДА 1:1'")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1", "parsing: 'JUDE 1:1'")
		expect(p.parse("ЈУДА 1:1").osis()).toEqual("Jude.1.1", "parsing: 'ЈУДА 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Tob (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Tob (mk)", function() {
      
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tob 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jdt (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jdt (mk)", function() {
      
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1", "parsing: 'Jdt 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Bar (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bar (mk)", function() {
      
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Bar 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Sus (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sus (mk)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1", "parsing: 'Sus 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Macc (mk)", function() {
      
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2Macc 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3Macc (mk)", function() {
      
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3Macc 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 4Macc (mk)", function() {
      
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4Macc 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (mk)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Macc (mk)", function() {
      
		expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1Macc 1:1'")
		;
      return true;
    });
  });

  describe("Miscellaneous tests", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should return the expected language", function() {
      return expect(p.languages).toEqual(["mk"]);
    });
    it("should handle ranges (mk)", function() {
      expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2", "parsing: 'Titus 1:1 - 2'");
      expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2", "parsing: 'Matt 1-2'");
      return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3", "parsing: 'Phlm 2 - 3'");
    });
    it("should handle chapters (mk)", function() {
      expect(p.parse("Titus 1:1, глави 2").osis()).toEqual("Titus.1.1,Titus.2", "parsing: 'Titus 1:1, глави 2'");
      expect(p.parse("Matt 3:4 ГЛАВИ 6").osis()).toEqual("Matt.3.4,Matt.6", "parsing: 'Matt 3:4 ГЛАВИ 6'");
      expect(p.parse("Titus 1:1, глава 2").osis()).toEqual("Titus.1.1,Titus.2", "parsing: 'Titus 1:1, глава 2'");
      return expect(p.parse("Matt 3:4 ГЛАВА 6").osis()).toEqual("Matt.3.4,Matt.6", "parsing: 'Matt 3:4 ГЛАВА 6'");
    });
    it("should handle verses (mk)", function() {
      expect(p.parse("Exod 1:1 verse 3").osis()).toEqual("Exod.1.1,Exod.1.3", "parsing: 'Exod 1:1 verse 3'");
      return expect(p.parse("Phlm VERSE 6").osis()).toEqual("Phlm.1.6", "parsing: 'Phlm VERSE 6'");
    });
    it("should handle 'and' (mk)", function() {
      expect(p.parse("Exod 1:1 и 3").osis()).toEqual("Exod.1.1,Exod.1.3", "parsing: 'Exod 1:1 и 3'");
      return expect(p.parse("Phlm 2 И 6").osis()).toEqual("Phlm.1.2,Phlm.1.6", "parsing: 'Phlm 2 И 6'");
    });
    it("should handle titles (mk)", function() {
      expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1", "parsing: 'Ps 3 title, 4:2, 5:title'");
      return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1", "parsing: 'PS 3 TITLE, 4:2, 5:TITLE'");
    });
    it("should handle 'ff' (mk)", function() {
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11", "parsing: 'Rev 3ff, 4:2ff'");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11", "parsing: 'REV 3 FF, 4:2 FF'");
    });
    it("should handle translations (mk)", function() {
      expect(p.parse("Lev 1 (ERV)").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
      return expect(p.parse("lev 1 erv").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
    });
    it("should handle book ranges (mk)", function() {
      p.set_options({
        book_alone_strategy: "full",
        book_range_strategy: "include"
      });
      return expect(p.parse("Прва - Трета  Јован").osis()).toEqual("1John.1-3John.1", "parsing: 'Прва - Трета  Јован'");
    });
    return it("should handle boundaries (mk)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28", "parsing: '\u2014Matt\u2014'");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1", "parsing: '\u201cMatt 1:1\u201d'");
    });
  });

}).call(this);
