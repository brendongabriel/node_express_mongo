import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {

  static async listarLivros(req, res) {
    try {
      const livros = await livro.find();
      res.status(200).json(livros);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (livroEncontrado != null) {
        res.status(200).json(livroEncontrado);
      } else {
        res.status(404).json({ message: "livro não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      if (autorEncontrado == null) {
        return res.status(404).json({ message: "autor não encontrado" });
      }
      novoLivro.autor = autorEncontrado._doc;
      const livroCriado = await livro.create(novoLivro);
      res.status(201).json({ message: "livro cadastrado com sucesso", livro: livroCriado });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      if (req.body == null) {
        res.status(400).json({ message: "Body inválido" });
      }
      const id = req.params.id;

      const livroAtual = await livro.findById(id);

      if (livroAtual == null) {
        return res.status(404).json({ message: "livro não encontrado" });
      }
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "livro atualizado com sucesso" });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removerLivro(req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (livroEncontrado != null) {
        await livro.findByIdAndDelete(id);
        res.status(200).json({ message: "livro removido com sucesso" });
      } else {
        res.status(404).json({ message: "livro não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async listarLivrosPorAutor(req, res) {
    try {
      const id = req.params.id;
      const livrosEncontrados = await livro.find({ "autor._id": id });
      if (livrosEncontrados != null) {
        res.status(200).json(livrosEncontrados);
      } else {
        res.status(404).json({ message: "livros não encontrados" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async listarLivrosPorEditora(req, res) {
    const editora = req.query.editora;
    try {
      const livrosEncontrados = await livro.find({ editora: editora });
      res.status(200).json(livrosEncontrados);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default LivroController;
